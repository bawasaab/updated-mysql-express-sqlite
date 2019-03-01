'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('coursePackages', 
    [
      {
        packageId: 1,
        courseId: 1,
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        packageId: 1,
        courseId: 2,
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('coursePackages', null, {});
  }
};