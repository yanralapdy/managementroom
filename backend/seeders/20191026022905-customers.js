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
    return queryInterface.bulkInsert('customers', [
      {
        name: 'Mas Ilham',
        identity_number: '1302122307940002',
        phone_number: '081245458173',
        image:
          'https://pbs.twimg.com/media/Cg9j3RRWUAAxAps?format=jpg&name=small',
      },
      {
        name: 'Mas Tyo',
        identity_number: '1302122307940002',
        phone_number: '081245458173',
        image:
          'https://pbs.twimg.com/profile_images/841496273589026816/6j-pZMzM.jpg',
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
    return queryInterface.bulkDelete('customers', null, {});
  },
};
