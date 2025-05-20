const express = require("express")
const { Movie } = require("../models");

const auth = require("../middleware/auth")

const router = express.Router();

//CREATING A MOVIE IS AN ADMIN'S OPERATION ONLY

//Admin check
function isAdmin(req, res, next){
    if(req.user.role != "admin" ){
        return res.status(403).json({message: "Access denied. Admins only"})
    }
    next();
}

router.post("/", auth, isAdmin, async (req, res) =>{
    const { title, description, genre, poster } = req.body;

    try{
        const movie = await Movie.create({title, description, genre, poster})
        res.status(201).json({message: "Movie created", movie})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
module.exports = router;