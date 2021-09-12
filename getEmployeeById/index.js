const Joi = require('joi');
const Department = require('../database/models/department');
const Employees = require('../database/models/employees');

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
