const yup = require('yup');
const Department = require('../database/models/department');
const Employees = require('../database/models/employees');
const insert = require('../database/queries/insert');
const select = require('../database/queries/select');
const update = require('../database/queries/update');

module.exports = async function (context, req) {
  const data = req.body;

  let status = 200;
  let body = '';

  const schema = yup.object().shape({
    employeeNumber: yup.number().required(),
    name: yup.string().required(),
    jobTitle: yup.string().required(),
    department: yup.string().required(),
    location: yup.string().required(),
  });

  const validation = schema.validate(data);

  if (validation && validation.error) {
    status = 400;
    body = validation.error.message;
  } else {
    const counter = await select(Employees, {
      where: {
        employeeNumber: data.employeeNumber,
        limit: 1,
      },
    });
    if (counter && counter.length) {
      const employee = await insert(Employees, data);
      const departmentPayload = {
        employeeNumber: employee.employeeNumber,
        name: data.department,
        location: data.location,
      };
      insert(Department, departmentPayload);
      body = { ...employee.dataValues, location: data.location };
      status = 201;
    } else {
      const employee = await update(Employees, data, {
        where: {
          employeeNumber: data.employeeNumber,
        },
      });
      const departmentPayload = {
        name: data.department,
        location: data.location,
      };
      const department = await update(Department, departmentPayload, {
        where: {
          employeeNumber: data.employeeNumber,
        },
      });
      body = { ...employee, ...department };
    }
  }

  context.res = {
    status: status,
    body: body,
  };
};
