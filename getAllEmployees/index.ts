import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import Department from '../database/models/department';
import Employee from '../database/models/employee';

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  let status: number = 200;
  let body: string | object = '';
  try {
    body = await Employee.findAll({
      include: Department,
    });

    // body = data;
  } catch (err) {
    status = 500;
    body = 'something went wrong';
  }
  context.res = {
    status: 200,
    body: body,
  };
};

export default httpTrigger;
