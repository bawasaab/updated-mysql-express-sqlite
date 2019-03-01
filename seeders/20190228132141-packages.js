'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Packages', 
    [
      {
        name: 'PHP crash course',
        briefIntro: 'Test brief Introduction',
        imageLink: 'link-to-image-url',
        price: '10.10',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        name: 'Nodejs crash course',
        briefIntro: 'Test brief Introduction',
        imageLink: 'link-to-image-url',
        price: '10.10',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
    ]
    , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Packages', null, {});
  }
};
