'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'CourseTypes', key: 'id' }
      },
      courseCategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'courseCategories', key: 'id' }
      },
      courseLevelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'CourseLevels', key: 'id' }
      },
      parentCourseId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      viewOrder: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      imageLink: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      durationType: {
        type: Sequelize.ENUM('HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS'),
        defaultValue: 'DAYS',
        allowNull: false
      },
      tags: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('OPEN', 'CLOSE', 'DELETED'),
        defaultValue: 'OPEN',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Courses');
  }
};