'use strict';
module.exports = (sequelize, DataTypes) => {
  const Packages = sequelize.define('Packages', {
    name: DataTypes.STRING,
    briefIntro: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  Packages.associate = function(models) {
    // associations can be defined here
  };
  return Packages;
};