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

  const validation = schema.isValid({ id: Number(id) });

  if (validation && validation.error) {
    status = 400;
    body = validation.error.message;
  } else {
    const counter = await Employees.findAll({
      where: {
        employeeNumber: Number(id),
      },
      limit: 1,
    });
    if (counter && counter.length) {
      Department.destroy({
        where: {
          employeeNumber: Number(id),
        },
      });
      Employees.destroy({
        where: {
          employeeNumber: Number(id),
        },
      });
    } else {
      status = 404;
      body = 'resource not found';
    }
  }

  context.res = {
    status: status,
    body: body,
  };
};
