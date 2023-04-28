'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Employment, {
        as: "profile",
        foreignKey: "profileCode"
      });

      Profile.hasMany(models.Experience, {
        as: "experiences",
        foreignKey: "profileCode"
      });

      Profile.hasMany(models.Education, {
        as: "educations",
        foreignKey: "profileCode"
      });

      Profile.hasMany(models.Skill, {
        as: "skills",
        foreignKey: "profileCode"
      })
    }
  };

  Profile.init({
    wantedJobTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    drivingLicense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    placeOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    photoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Profile",
    freezeTableName: true
  });

  return Profile;
}
