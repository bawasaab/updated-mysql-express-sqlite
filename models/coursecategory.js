'use strict';
module.exports = (sequelize, DataTypes) => {
  const courseCategory = sequelize.define('courseCategory', {
    parentCategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED')
  }, {});
  courseCategory.associate = function(models) {
    // associations can be defined here
  };
  return courseCategory;
};