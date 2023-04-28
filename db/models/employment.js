'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employment.belongsTo(models.Profile, {
        as: "profile",
        foreignKey: "profileCode"
      });
    }
  }
  Employment.init({
    jobTitle: DataTypes.STRING,
    employer: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    city: DataTypes.STRING,
    description: DataTypes.TEXT,
    profileCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employment',
    freezeTableName: true
  });
  return Employment;
};