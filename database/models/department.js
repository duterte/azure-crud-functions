const { DataTypes } = require('sequelize');
const db = require('../index');

const Department = db.define(
  'department',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeNumber: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// Department.sync({ force: true });
module.exports = Department;
