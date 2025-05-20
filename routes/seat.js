const express = require("express")
const router = express.Router()
const {Seat} = require("../models")
const auth = require("../middleware/auth")

//RSERVING A SEAT IS FOR EVERY USER NOT ONLY ADMINS

router.post("/" , auth, async( req, res)=>{
    const {seatId} = req.body

    try{
        const seat = await Seat.findByPk(seatId)

        if(!seat){
            return res.status(404).json({message: "Seat not found!"})
        }
        
        if(seat.isReserved){
            return res.status(400).json({ message: 'Seat already reserved' });
        }

        seat.isReserved = true
        await seat.save()

        res.status(200).json({message: 'Seat reserved successfully', seat })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}) 

module.exports = router 