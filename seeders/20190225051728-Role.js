'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Roles', [{
      id: '1',
      name: 'SUPERADMIN',
      status: 'OPEN',
      createdAt: dated,
      updatedAt: dated
    },
    {
      id: '2',
      name: 'ADMIN',
      status: 'OPEN',
      createdAt: dated,
      updatedAt: dated
    },
    {
      id: '3',
      name: 'STUDENT',
      status: 'OPEN',
      createdAt: dated,
      updatedAt: dated
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Roles', null, {});
      */
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
