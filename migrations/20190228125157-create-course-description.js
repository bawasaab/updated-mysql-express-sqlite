'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CourseDescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Courses', key: 'id' }
      },
      viewOrder: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      briefIntro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      articleDescription: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      link: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('CourseDescriptions');
  }
};