'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseLevel = sequelize.define('CourseLevel', {
    name: DataTypes.STRING,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  CourseLevel.associate = function(models) {
    // associations can be defined here
  };
  return CourseLevel;
};