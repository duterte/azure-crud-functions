import { ModelCtor, FindOptions } from 'sequelize/types';
import { UserInfo } from '../../createEmployee';

export default async (Model: ModelCtor<any>, options?: any): Promise<any> => {
  Model.findAll();
  const data = await Model.findAll({ ...options });
  console.log(data);
  return data;
};
