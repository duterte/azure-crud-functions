import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import Department from '../database/models/department';
import Employee from '../database/models/employee';

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  try {
    const data = await Employee.findAll({
      include: Department,
    });
    context.res = {
      status: 200,
      body: data,
    };
  } catch (err) {
    console.log(err);
    context.res = {
      status: 500,
      body: 'something went wrong',
    };
  }
};

export default httpTrigger;
