import { ModelCtor } from 'sequelize/types';
import { UserInfo } from '../data';

export default async (
  Model: ModelCtor<any>,
  data: UserInfo,
  option?: any
): Promise<any> => {
  await Model.update(data, option);
  return data;
};
