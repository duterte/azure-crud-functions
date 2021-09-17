import { ModelCtor } from 'sequelize/types';
import { UserInfo } from '../data';
const INCREMENT = 'employeeNumber';

export default async (
  Model: ModelCtor<any>,
  data: UserInfo,
  option?: any
): Promise<any> => {
  if (option && option.increment) {
    const index: number = await Model.max(INCREMENT);

    if (index) {
      data[INCREMENT] = index + 1;
    } else {
      data[INCREMENT] = 1;
    }
    console.log({ increment: index, employeeNumber: index + 1 });
  }
  data = await Model.create(data);
  return data;
};