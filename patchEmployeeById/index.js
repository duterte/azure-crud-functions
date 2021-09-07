const Joi = require('joi');
const DATABASE = require('../data');

module.exports = async function (context, req) {
  const { id } = req.params;
  const data = req.body;

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
    const schema2 = Joi.object({
      name: Joi.string(),
      jobTitle: Joi.string(),
      department: Joi.string(),
    });

    const joi2 = schema2.validate(data);
    if (joi2 && joi2.error) {
      status = 400;
      body = joi.error.message;
    } else {
      const index = DATABASE.findIndex((i) => i.employeeNumber === Number(id));

      if (index === -1) {
        return res.status(404).send('resource not found');
      } else {
        DATABASE[index] = {
          ...DATABASE[index],
          ...data,
          employeeNumber: Number(id),
        };

        body = {
          employeeNumber: Number(id),
          ...data,
        };
      }
    }
  }

  context.res = {
    status: status,
    body: body,
  };
};
