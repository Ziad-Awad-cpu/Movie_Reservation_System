const express = require("express")
const { Movie } = require("../models");

const auth = require("../middleware/auth")

const router = express.Router();

//GET ALL THE MOIVES IS FOR EVERY USER NOT ONLY ADMINS


router.get("/", async (req, res)=>{
    try{
        const movies = await Movie.findAll()
        res.json(movies)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router;