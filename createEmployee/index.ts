import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { SchemaOf, object, string } from 'yup';
import Department from '../database/models/department';
import Employee from '../database/models/employee';
import insert from '../database/queries/insert';

export interface QueryObj {
  employeeNumber?: number;
  name?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
}

export interface CreatebodySchema {
  name: string;
  jobTitle: string;
  department: string;
  location: string;
}

interface EmployeeObj {
  name: string;
  jobTitle: string;
}

interface DepartmentObj {
  employeeNumber: number;
  name: string;
  location: string;
}

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  const data = req.body;
  let status = 200;
  let body = '';
  try {
    const schema: SchemaOf<CreatebodySchema> = object({
      name: string().defined(),
      jobTitle: string().defined(),
      department: string().defined(),
      location: string().defined(),
    }).defined();

    await schema.validate(data);

    const employeePayload: EmployeeObj = {
      name: data.name,
      jobTitle: data.jobTitle,
    };

    const employee = await insert(Employee, employeePayload, {
      increment: true,
    });

    const departmentPayload: DepartmentObj = {
      employeeNumber: employee.employeeNumber,
      name: data.department,
      location: data.location,
    };

    insert(Department, departmentPayload);
    body = { ...employee.dataValues, location: data.location };
    status = 201;
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
