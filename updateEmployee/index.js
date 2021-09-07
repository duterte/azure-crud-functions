const Joi = require('joi');
const DATABASE = require('../data');

module.exports = async function (context, req) {
  const data = req.body;

  let status = 200;
  let body = '';

  const schema = Joi.object({
    employeeNumber: Joi.number().required(),
    name: Joi.string().required(),
    jobTitle: Joi.string().required(),
    department: Joi.string().required(),
  });

  const joi = schema.validate(data);

  if (joi && joi.error) {
    status = 400;
    body = joi.error.message;
  } else {
    const index = DATABASE.findIndex(
      (i) => i.employeeNumber === Number(data.employeeNumber)
    );

    if (index === -1) {
      DATABASE.push(data);
      status = 201;
    } else {
      DATABASE[index] = data;
    }
    body = data;
  }

  context.res = {
    status: status,
    body: body,
  };
};
