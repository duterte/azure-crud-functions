const Joi = require('joi');
const DATABASE = require('../data');

module.exports = async function (context, req) {
  const data = req.body;
  let status = 200;
  let body = '';

  const schema = Joi.object({
    name: Joi.string().required(),
    jobTitle: Joi.string().required(),
    department: Joi.string().required(),
  });

  const joi = schema.validate(data);

  if (joi && joi.error) {
    status = 400;
    body = joi.error.message;
  } else {
    const employeeNumber = DATABASE[DATABASE.length - 1].employeeNumber;
    data['employeeNumber'] = employeeNumber + 1;
    DATABASE.push(data);
    status = 201;
    body = data;
  }

  context.res = {
    status: status,
    body: body,
  };
};
