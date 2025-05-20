const express = require('express');
const router = express.Router();
const { Seat, Reservation, sequelize } = require('../models');

// POST /reserve
router.post("/", async (req, res) => {
  const { userId, showtimeId, seatIds } = req.body;

  // Basic validation
  if (!userId || !showtimeId || !Array.isArray(seatIds) || seatIds.length === 0) {
    return res.status(400).json({ message: 'Missing or invalid input.' });
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      // 1. Fetch seats for the given showtime and IDs, lock for transaction
      const seats = await Seat.findAll({
        where: {
          id: seatIds,
          showtimeId
        },
        lock: t.LOCK.UPDATE,
        transaction: t
      });

      // 2. Check for missing or reserved seats
      if (seats.length !== seatIds.length) {
        return res.status(404).json({ message: 'Some seats not found for this showtime.' });
      }

      const alreadyReserved = seats.filter(seat => seat.isReserved);
      if (alreadyReserved.length > 0) {
        return res.status(409).json({
          message: 'Some seats are already reserved.',
          reservedSeats: alreadyReserved.map(s => s.seatNumber)
        });
      }

      // 3. Reserve each seat & create reservation
      const reservations = [];
      for (const seat of seats) {
        await seat.update({ isReserved: true }, { transaction: t });

        const reservation = await Reservation.create({
          userId,
          showtimeId,
          seatId: seat.id
        }, { transaction: t });

        reservations.push(reservation);
      }

      return reservations;
    });

    res.status(201).json({
      message: 'Seats reserved successfully.',
      reservations: result
    });

  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
