'use strict';
var dated = new Date;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('courses', [
      {
        id: '1',
        courseTypeId: '1',
        courseCategoryId: '1',
        courseLevelId: '1',
        parentCourseId: '1',
        viewOrder: '1',
        title: 'PHP',
        imageLink: 'https://via.placeholder.com/150',
        description: 'PHP (recursive acronym for PHP: Hypertext Preprocessor) is a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.',
        duration: '6',
        durationType: 'MONTHS',
        tags: '{"php", "arrays"}',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
      {
        id: '2',
        courseTypeId: '1',
        courseCategoryId: '1',
        courseLevelId: '1',
        parentCourseId: '1',
        viewOrder: '1',
        title: 'NodeJs',
        imageLink: 'https://via.placeholder.com/150',
        description: 'Node.js is a server-side platform built on Google Chrome JavaScript Engine (V8 Engine). Node.js was developed by Ryan Dahl in 2009',
        duration: '6',
        durationType: 'MONTHS',
        tags: '{"nodejs", "promises"}',
        status: 'OPEN',
        createdAt: dated,
        updatedAt: dated
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};
