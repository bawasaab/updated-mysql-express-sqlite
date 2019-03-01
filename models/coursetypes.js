'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseTypes = sequelize.define('CourseTypes', {
    name: DataTypes.STRING,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  CourseTypes.associate = function(models) {
    // associations can be defined here
  };
  return CourseTypes;
};