const Joi = require('joi');
let DATABASE = require('../data');
const Department = require('../database/models/department');
const Employees = require('../database/models/employees');
const select = require('../database/queries/select');

module.exports = async function (context, req) {
  const { id } = req.params;
  let status = 200;
  let body = '';

  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const joi = schema.validate({ id: Number(id) });

  if (joi && joi.error) {
    status = 400;
    body = joi.error.message;
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
