const Department = require('../database/models/department');
const Employees = require('../database/models/employees');

module.exports = async function (context, req) {
  try {
    const data = await Employees.findAll({
      include: Department,
    });
    context.res = {
      status: 200,
      body: data,
    };
  } catch (err) {
    console.log(err);
    context.res = {
      status: 500,
      body: 'something went wrong',
    };
  }
};
