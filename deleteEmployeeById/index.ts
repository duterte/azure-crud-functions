import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { SchemaOf, object, number } from 'yup';
import Department from '../database/models/department';
import Employee from '../database/models/employee';

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  let status: number = 200;
  let body: string | object = '';
  try {
    const { id } = req.params;
    const schema: SchemaOf<number> = number().defined();
    await schema.validate(Number(id));
    const where = { employeeNumber: Number(id) };
    const counter = await Employee.findAll({ where, limit: 1 });
    if (counter && counter.length) {
      Department.destroy({ where });
      Employee.destroy({ where });
    } else {
      status = 404;
      body = 'resource not found';
    }
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      status = 400;
      body = err.message;
    } else {
      status = 500;
      body = 'something went wrong';
    }
  }
  context.res = {
    status: status,
    body: body,
  };
};

export default httpTrigger;
