const express = require("express");
require("dotenv").config();
const app = express();
const { User } = require("./models");
app.use(express.json())

const signup = require("./routes/signup")
const login =require("./routes/login")
const createMovie = require("./routes/createMovie")
const getAllMovies = require("./routes/getAllMovies")
const updateMovie = require("./routes/updateMovie")
const showTime = require("./routes/showtime")
const reserveSeat = require("./routes/seat")
const reservations = require("./routes/reservations")

//SIGNUP
app.use("/signup", signup)

//LOGIN 
app.use("/login", login)

//CREATE MOVIE(ADMINS ONLY)
app.use("/create-movie", createMovie)

//GET ALL MOVIES
app.use("/get-movies", getAllMovies)

//UPDATE MOVIE(ADMINS ONLY)
app.use("/update-movie", updateMovie)

//CREATE SHOWTIME(ADMINS ONLY)
app.use("/showtimes", showTime)

//RESERVE A SEAT
app.use("/reserve-seat", reserveSeat )

//RESERVATIONS
app.use("/reserve" , reservations)

const PORT =  process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`🚀 Server is running on http://localhost:${PORT}`))