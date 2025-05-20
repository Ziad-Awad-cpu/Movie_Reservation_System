const express = require("express");
const {Movie, Showtime} = require("../models")
const auth = require("../middleware/auth")

const router = express.Router()

//CREATING A SHOWTIME FOR A MOVIE IS AN ADMIN'S OPERATION ONLY

//Admin check
function isAdmin(req, res, next){
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "Access denied. Admins only"})
    }
    next();
}

router.post("/", auth ,isAdmin, async(req, res)=>{
    const {movieId , startTime} = req.body

    try{
        const movie = await Movie.findByPk(movieId)
        
        if(!movie){
            return res.status(404).json({message: "Movie not found"})
        }

        const showtime = await Showtime.create({movieId , startTime})

        res.status(201).json({message: "Showtime created", showtime})
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router