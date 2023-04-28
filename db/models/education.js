'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.Profile, {
        as: "profile",
        foreignKey: "profileCode"
      });
    }
  }
  Education.init({
    school: DataTypes.STRING,
    degree: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    city: DataTypes.STRING,
    description: DataTypes.TEXT,
    profileCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Education',
    freezeTableName: true
  });
  return Education;
};