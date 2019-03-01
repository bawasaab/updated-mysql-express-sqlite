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

    return queryInterface.bulkInsert('users', 
    [
      {
        "roleId": "1",
        "firstName": "Super",
        "lastName": "Admin",
        "email": "super_admin@test.com",
        "password": "5f4dcc3b5aa765d61d8327deb882cf99",
        "contactNo": "7508498585",
        "gender": "MALE",
        "status": "OPEN",
        createdAt: dated,
        updatedAt: dated
      },
      {
        "roleId": "2",
        "firstName": "Admin",
        "lastName": "",
        "email": "admin@test.com",
        "password": "5f4dcc3b5aa765d61d8327deb882cf99",
        "contactNo": "7508498586",
        "gender": "MALE",
        "status": "OPEN",
        createdAt: dated,
        updatedAt: dated
      },
      {
        "roleId": "3",
        "firstName": "Jhon",
        "lastName": "Doe",
        "email": "student@test.com",
        "password": "5f4dcc3b5aa765d61d8327deb882cf99",
        "contactNo": "7508498587",
        "gender": "MALE",
        "status": "OPEN",
        createdAt: dated,
        updatedAt: dated
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
     return queryInterface.bulkDelete('users', null, {});
  }
};
