const yup = require('yup');
const Department = require('../database/models/department');
const Employees = require('../database/models/employees');
const insert = require('../database/queries/insert');

module.exports = async function (context, req) {
  try {
    const data = req.body;
    let status = 200;
    let body = '';

    const schema = yup.object().shape({
      name: yup.string().required(),
      jobTitle: yup.string().required(),
      department: yup.string().required(),
      location: yup.string().required(),
    });

    const validation = await schema.isValid(data);

    console.log(validation);

    if (validation && validation.error) {
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
