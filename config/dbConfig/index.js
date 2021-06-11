'use strict';

const Sequelize = require('sequelize');
const { success, error } = require('consola');
const env = (process.env.NODE_ENV || 'development').toLowerCase();
const config = require(__dirname + '/../')[env];
let db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config)

sequelize
  .authenticate()
  .then(() => {
    success({ message: `MySqlDB connection established`, badge: true })
  })
  .catch(err => {
    error({ message: `MySqlDB connection failed`, badge: true })
  });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db