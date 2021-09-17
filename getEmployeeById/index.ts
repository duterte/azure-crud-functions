import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { SchemaOf, object, number } from 'yup';
import Department from '../database/models/department';
import Employee from '../database/models/employee';

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  try {
    const { id } = req.params;
    let status: number = 200;
    let body: any = '';
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

    context.res = {
      status: status,
      body: body,
    };
  } catch (err: any) {
    let status = 500;
    let body = 'something went wrong';
    console.log('error');
    console.log(err.name);
    if (err.name === 'ValidationError') {
      status = 400;
      body = err.message;
    }
    context.res = {
      status: status,
      body: body,
    };
  }
};

export default httpTrigger;
