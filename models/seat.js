'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      // A seat belongs to one showtime
      Seat.belongsTo(models.Showtime, { foreignKey: 'showtimeId' });

      // A seat can have one reservation
      Seat.hasOne(models.Reservation, { foreignKey: 'seatId' });
    }
  }

  Seat.init({
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isReserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });

  return Seat;
};
