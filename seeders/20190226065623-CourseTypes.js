'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.bulkInsert('CourseTypes', [
      {
        id: '1',
        name: 'TUTORIAL-BLOG',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        id: '2',
        name: 'TUTORIAL-VIDEO',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        id: '3',
        name: 'TUTORIAL-EMBEDDED',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        id: '4',
        name: 'TUTORIAL-SCREENCAST',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        id: '5',
        name: 'BOOK-PDF',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        id: '6',
        name: 'BOOK-WORD',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.bulkDelete('CourseTypes', null, {});
  }
};
