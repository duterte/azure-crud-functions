const Joi = require('joi');
let DATABASE = require('../data');

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
    const index = DATABASE.findIndex((i) => i.employeeNumber === Number(id));

    if (index === -1) {
      status = 404;
      body = 'resource not found';
    } else {
      DATABASE = DATABASE.filter((i) => i.employeeNumber !== Number(id));
      body = 'deleted successfully';
    }
  }

  context.res = {
    status: status,
    body: body,
  };
};
