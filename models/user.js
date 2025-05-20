'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // A user can have many reservations
      User.hasMany(models.Reservation, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
