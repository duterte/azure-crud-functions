import { ModelCtor } from 'sequelize/types';

export default async (Model: ModelCtor<any>, options?: any): Promise<any> => {
  const data = await Model.findAll({ ...options });
  return data;
};
