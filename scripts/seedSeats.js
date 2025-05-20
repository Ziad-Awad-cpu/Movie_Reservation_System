const {Sequelize , sequelize, Seat, Showtime} = require("../models")

const createSeatForShowtime = async(showtimeId , seatCount= 7)=>{

    for (let i = 1; i<= seatCount ; i++){
        await Seat.create({
            showtimeId,
            seatNumber: `A${i}`,
            isReserved: false
        })
    }
}

const seedSeats = async()=>{
    try{
        await sequelize.authenticate();

        const showtimes = await Showtime.findAll()

        for (const showtime of showtimes){
            await createSeatForShowtime(showtime.id)
            console.log(`Seeded 7 seats for showtime ID: ${showtime.id}`);
        }

        console.log('Seeding completed.');
        process.exit();
    }catch(err){
        console.error('Error seeding seats:', err);
        process.exit(1);
    }
}

seedSeats();