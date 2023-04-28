'use strict'

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { defu } = require("defu");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/database.json")[env];

const defineOptions = defu(config, {
  query: { raw: true, logging: console.log }
});
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], defineOptions)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, defineOptions);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === ".js")
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
