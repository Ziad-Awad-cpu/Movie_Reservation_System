'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Showtime.associate = function(models){
        Showtime.belongsTo(models.Movie, {foreignKey:'movieId'});
        Showtime.hasMany(models.Seat, {foreignKey: 'showtimeId'})
        Showtime.hasMany(models.Reservation, {foreignKey: 'showtimeId'})
      }
    }
  }
  Showtime.init({
    movieId: DataTypes.INTEGER,
    startTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Showtime',
  });
  return Showtime;
};