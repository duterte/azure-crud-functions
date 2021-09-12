const Joi = require('joi');
const Department = require('../database/models/department');
const Employees = require('../database/models/employees');
const insert = require('../database/queries/insert');

module.exports = async function (context, req) {
  try {
    const data = req.body;
    let status = 200;
    let body = '';

    const schema = Joi.object({
      name: Joi.string().required(),
      jobTitle: Joi.string().required(),
      department: Joi.string().required(),
      location: Joi.string().required(),
    });

    const joi = schema.validate(data);

    if (joi && joi.error) {
      status = 400;
      body = joi.error.message;
    } else {
      const employeePayload = {
        name: data.name,
        jobTitle: data.jobTitle,
      };

      const employee = await insert(Employees, employeePayload, {
        increment: true,
      });
      const departmentPayload = {
        employeeNumber: employee.employeeNumber,
        name: data.department,
        location: data.location,
      };
      insert(Department, departmentPayload);
      body = { ...employee.dataValues, location: data.location };
      status = 201;
    }

    context.res = {
      status: status,
      body: body,
    };
  } catch (err) {
    console.log(err);
    context.res = {
      status: 500,
      body: 'something went wrong',
    };
  }
};
