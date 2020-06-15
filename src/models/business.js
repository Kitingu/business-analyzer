'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('business', {
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    countries: DataTypes.STRING,
    revenue: DataTypes.INTEGER,
    software: DataTypes.STRING,
    abbreviation: DataTypes.STRING,
    country: DataTypes.STRING,
    entity: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
  };
  return Business;
};