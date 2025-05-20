'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.associate = function(models) {
        Reservation.belongsTo(models.User, { foreignKey: 'userId' });
        Reservation.belongsTo(models.Showtime, { foreignKey: 'showtimeId' });
        Reservation.belongsTo(models.Seat, { foreignKey: 'seatId' });
      }; 
    }
  }
  Reservation.init({
    userId: DataTypes.INTEGER,
    showtimeId: DataTypes.INTEGER,
    seatId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};