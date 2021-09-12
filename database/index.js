require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST || 'localhost',
    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialect: process.env.DB || 'postgres',
    logging: process.env.NODE_ENV === 'production' ? false : true,
  }
);
