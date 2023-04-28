'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.Profile, {
        as: "profile",
        foreignKey: "profileCode"
      })
    }
  }
  Skill.init({
    skill: DataTypes.STRING,
    level: DataTypes.STRING,
    profileCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Skill',
    freezeTableName: true
  });
  return Skill;
};