'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CourseLevels', [
      {
        name: 'BEGINNER',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        name: 'INTERMEDIATE',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        name: 'EXPERT',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CourseLevels', null, {});
  }
};
