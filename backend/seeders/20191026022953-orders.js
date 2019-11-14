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
    return queryInterface.bulkInsert('orders', [
      {
        duration: 0,
        is_booked: false,
        is_done: true,
        order_end_time: '2019-10-26T05:31:08.000Z',
        customer: 1,
        room: 1,
      },
      {
        duration: 0,
        is_booked: true,
        is_done: false,
        order_end_time: '2019-10-26T05:31:08.000Z',
        customer: 2,
        room: 2,
      },
      // {
      //   duration: 0,
      //   is_booked: true,
      //   is_done: false,
      //   order_end_time: '2019-10-26T05:31:08.000Z',
      //   customer: 3,
      //   room: 3,
      // },
      // {
      //   duration: 0,
      //   is_booked: false,
      //   is_done: true,
      //   order_end_time: '2019-10-26T05:31:08.000Z',
      //   customer: 4,
      //   room: 4,
      // },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('People', null, {});
  */
    return queryInterface.bulkDelete('orders', null, {});
  },
};
