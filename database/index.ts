import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();

enum Dialect {
  'mysql' = 'mysql',
  'mariadb' = 'mariadb',
  'postgres' = 'postgres',
  'mssql' = 'mssql',
}

const DB_DIALECT = process.env.DB as Dialect;
const DB_HOST = process.env.DB_HOST as string;
const DB_UNAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PWD = process.env.DB_PWD as string;

const sequelize = new Sequelize(DB_UNAME, DB_USER, DB_PWD, {
  host: DB_HOST,
  dialect: DB_DIALECT || Dialect.postgres,
});

export default sequelize;
