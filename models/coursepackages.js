'use strict';
module.exports = (sequelize, DataTypes) => {
  const coursePackages = sequelize.define('coursePackages', {
    packageId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  coursePackages.associate = function(models) {
    // associations can be defined here
  };
  return coursePackages;
};