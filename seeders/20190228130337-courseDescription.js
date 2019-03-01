'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CourseDescriptions', 
    [
      {
        courseId: '1',
        viewOrder: '1',
        briefIntro: 'Testing',
        articleDescription: 'Dummy text',
        link: 'link-of-the-url',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        courseId: '1',
        courseId: '1',
        viewOrder: '1',
        briefIntro: 'Testing',
        articleDescription: 'Dummy text',
        link: 'link-of-the-url',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CourseDescriptions', null, {});
  }
};
