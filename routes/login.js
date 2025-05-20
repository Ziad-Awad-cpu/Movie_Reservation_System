const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({where: {email} })
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"})
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token });
    }catch(err){
        res.status(500).json({error: err.message})
    }


})

module.exports = router;