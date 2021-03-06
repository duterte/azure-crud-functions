import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { SchemaOf, object, string, number } from 'yup';
import Department from '../database/models/department';
import update from '../database/queries/update';
import Employee from '../database/models/employee';
import insert from '../database/queries/insert';
import { CreatebodySchema } from '../createEmployee';

interface UpdatebodySchema extends CreatebodySchema {
  employeeNumber: number;
}

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  try {
    const data = req.body;
    let status = 200;
    let body = '';
    const schema: SchemaOf<UpdatebodySchema> = object({
      employeeNumber: number().defined(),
      name: string().defined(),
      jobTitle: string().defined(),
      department: string().defined(),
      location: string().defined(),
    }).defined();

    await schema.validate(data);

    const counter = await Employee.findAll({
      where: {
        employeeNumber: data.employeeNumber,
      },
      limit: 1,
    });
    if (counter && counter.length === 0) {
      const employee = await insert(Employee, data);
      const departmentPayload = {
        employeeNumber: data.employeeNumber,
        name: data.department,
        location: data.location,
      };
      insert(Department, departmentPayload);
      body = { ...employee.dataValues, location: data.location };
      status = 201;
    } else {
      const employee = await update(Employee, data, {
        where: {
          employeeNumber: data.employeeNumber,
        },
      });
      const departmentPayload = {
        name: data.department,
        location: data.location,
      };
      const department = await update(Department, departmentPayload, {
        where: {
          employeeNumber: data.employeeNumber,
        },
      });
      body = { ...employee, ...department };
    }

    context.res = {
      status: status,
      body: body,
    };
  } catch (err: any) {
    let status = 500;
    let body = 'something went wrong';
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
