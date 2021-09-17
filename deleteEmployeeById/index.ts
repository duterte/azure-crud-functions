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

    const counter = await Employee.findAll({
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
      Employee.destroy({
        where: {
          employeeNumber: Number(id),
        },
      });
    } else {
      status = 404;
      body = 'resource not found';
    }

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
