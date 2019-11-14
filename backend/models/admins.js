'use strict';
module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define(
    'admins',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {},
  );
  admins.associate = function(models) {
    // associations can be defined here
  };
  return admins;
};
