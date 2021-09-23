import { ModelCtor } from 'sequelize/types';
import { QueryObj } from '../../createEmployee';

export default async (
  Model: ModelCtor<any>,
  data: QueryObj,
  option?: any
): Promise<any> => {
  await Model.update(data, option);
  return data;
};
