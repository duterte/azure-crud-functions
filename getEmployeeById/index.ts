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

    const employee = await Employee.findAll({
      where: {
        employeeNumber: id,
      },
      include: Department,
      limit: 1,
    });
    body = employee;
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
