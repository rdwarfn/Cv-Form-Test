'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Experience.belongsTo(models.Profile, {
        as: "profile",
        foreignKey: "profileCode"
      });
    }
  }
  Experience.init({
    workingExperience: DataTypes.STRING,
    profileCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Experience',
    freezeTableName: true
  });
  return Experience;
};