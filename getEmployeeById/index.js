const Joi = require('joi');
const DATABASE = require('../data');

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
    const employee = DATABASE.find((i) => i.employeeNumber === Number(id));
    if (!employee) {
      status = 404;
      body = 'resource not found';
    } else {
      body = employee;
    }
  }

  context.res = {
    status: status,
    body: body,
  };
};
