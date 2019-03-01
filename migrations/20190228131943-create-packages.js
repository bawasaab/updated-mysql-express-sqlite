'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      briefIntro: {
        type: Sequelize.STRING
      },
      imageLink: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
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
    return queryInterface.dropTable('Packages');
  }
};