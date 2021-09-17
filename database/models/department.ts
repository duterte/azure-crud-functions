import db from '../index';
import { Model, Optional, DataTypes } from 'sequelize';

// We recommend you declare an interface for the attributes, for stricter typechecking
interface DepartmentAttr {
  id: number;
  employeeNumber: number;
  name: string;
  location: string;
}

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface DeptCreationAttributes extends Optional<DepartmentAttr, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface DeptInstance
  extends Model<DepartmentAttr, DeptCreationAttributes>,
    DepartmentAttr {}

const Department = db.define<DeptInstance>(
  'department',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeNumber: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Department;
