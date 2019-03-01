'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('courseCategories', [
      {
        id: '1',
        parentCategoryId: '0',
        name: 'PHP',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        id: '2',
        parentCategoryId: '1',
        name: 'Arrays in PHP',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courseCategories', null, {});
  }
};
