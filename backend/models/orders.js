'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
    {
      duration: DataTypes.INTEGER,
      is_booked: DataTypes.BOOLEAN,
      is_done: DataTypes.BOOLEAN,
      order_end_time: DataTypes.DATE,
      customer: DataTypes.INTEGER,
      room: DataTypes.INTEGER,
    },
    {},
  );
  orders.associate = function(models) {
    // associations can be defined here
    orders.belongsTo(models.customers, {
      as: 'customerId',
      foreignKey: 'customer',
    });

    orders.belongsTo(models.rooms, {
      as: 'roomId',
      foreignKey: 'room',
    });
  };
  return orders;
};
