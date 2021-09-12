const { DataTypes } = require('sequelize');
const db = require('../index');
const Department = require('./department');

const Employees = db.define(
  'employee',
  {
    employeeNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    jobTitle: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Employees.hasOne(Department, { foreignKey: 'employeeNumber' });
Department.belongsTo(Employees, { foreignKey: 'employeeNumber' });
db.sync({ force: true });
module.exports = Employees;
