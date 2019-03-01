'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('coursePackages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      packageId: {
        type: Sequelize.INTEGER,
        references: { model: 'Packages', key: 'id' }
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: { model: 'Courses', key: 'id' }
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
    return queryInterface.dropTable('coursePackages');
  }
};