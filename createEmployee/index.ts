import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { SchemaOf, object, string } from 'yup';
import Department from '../database/models/department';
import Employee from '../database/models/employee';
import insert from '../database/queries/insert';

export interface UserInfo {
  employeeNumber?: number;
  name: string;
  jobTitle?: string;
  department?: string;
  location?: string;
}

type ReqbodySchema = {
  name: string;
  jobTitle: string;
  department: string;
  location: string;
};

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  try {
    const data = req.body;
    let status = 200;
    let body = '';
    const schema: SchemaOf<ReqbodySchema> = object({
      name: string().defined(),
      jobTitle: string().defined(),
      department: string().defined(),
      location: string().defined(),
    }).defined();

    await schema.validate(data);

    const employeePayload: UserInfo = {
      name: data.name,
      jobTitle: data.jobTitle,
    };

    const employee = await insert(Employee, employeePayload, {
      increment: true,
    });

    const departmentPayload: UserInfo = {
      employeeNumber: employee.employeeNumber,
      name: data.department,
      location: data.location,
    };

    insert(Department, departmentPayload);
    body = { ...employee.dataValues, location: data.location };
    status = 201;

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
