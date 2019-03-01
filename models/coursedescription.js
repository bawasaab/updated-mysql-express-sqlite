'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseDescription = sequelize.define('CourseDescription', {
    courseId: DataTypes.INTEGER,
    viewOrder: DataTypes.INTEGER,
    briefIntro: DataTypes.STRING,
    articleDescription: DataTypes.TEXT,
    link: DataTypes.STRING,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  CourseDescription.associate = function(models) {
    // associations can be defined here
  };
  return CourseDescription;
};