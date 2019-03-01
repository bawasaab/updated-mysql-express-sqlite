'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    courseTypeId: DataTypes.INTEGER,
    courseCategoryId: DataTypes.INTEGER,
    courseLevelId: DataTypes.INTEGER,
    parentCourseId: DataTypes.INTEGER,
    viewOrder: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    durationType: DataTypes.ENUM('MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS'),
    tags: DataTypes.TEXT,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
  };
  return Course;
};