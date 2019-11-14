'use strict';

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
    return queryInterface.bulkInsert('admins', [
      {
        email: 'omdy@gmail.com',
        password: '1234',
        name: 'Om Dy',
        image: 'https://cdn.myanimelist.net/images/userimages/40741.jpg',
      },
      {
        email: 'lor@gmail.com',
        password: '1234',
        name: 'lor han',
        image: 'https://cdn130.picsart.com/272333719020211.png?r1024x1024',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('People', null, {});
  */
    return queryInterface.bulkDelete('admins', null, {});
  },
};
