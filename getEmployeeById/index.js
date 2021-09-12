const yup = require('yup');
const Department = require('../database/models/department');
const Employees = require('../database/models/employees');

module.exports = async function (context, req) {
  const { id } = req.params;
  let status = 200;
  let body = '';

  const schema = yup.object().shape({
    id: yup.number().required(),
  });
  const validation = schema.validate({ id: Number(id) });

  if (validation && validation.error) {
    status = 400;
    body = joi.error.message;
  } else {
    const employee = await Employees.findAll({
      where: {
        employeeNumber: id,
      },
      include: Department,
      limit: 1,
    });
    body = employee;
  }

  context.res = {
    status: status,
    body: body,
  };
};
