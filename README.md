# 🎬 Movie Reservation System

This is a backend system for a movie reservation service. It allows users to sign up, log in, browse movies and their showtimes, reserve seats, and manage reservations. Admin users can manage movies, showtimes, and view reservation reports.

---

## 🚀 Features

###  User Authentication & Authorization
- User Sign Up & Login
- JWT-based authentication
- Role-based access: `admin` and `user` users

### Movie Management (Admin Only)
- Add, update, and delete movies
- Each movie has a title, description, genre, and poster URL
- Assign showtimes to movies

###  Showtime Management (Admin Only)
- Create showtimes for movies
- Automatically generate seats for each showtime

###  Seat Reservation (User)
- Browse available movies and showtimes
- View and reserve seats
- Prevents overbooking
- Users can cancel their own upcoming reservations

###  Admin Reporting
- View all reservations
- See capacity and revenue reports

---

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Sequelize ORM
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Validation & Middleware:** Express middlewares
- **ORM:** Sequelize

---

##  Installation

```bash
git clone https://github.com/Ziad-Awad-cpu/Movie_Reservation_System.git
cd Movie_Reservation_System
npm install

