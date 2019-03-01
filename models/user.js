'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    roleId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    contactNo: DataTypes.STRING,
    gender: DataTypes.ENUM('MALE', 'FEMALE'),
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};