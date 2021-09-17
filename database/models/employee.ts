import { Model, Optional, DataTypes } from 'sequelize';
import db from '../index';
import Department from './department';

// We recommend you declare an interface for the attributes, for stricter typechecking
interface EmployeeAttr {
  employeeNumber: number;
  name: number;
  jobTitle: string;
}

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface EmployeeCreationAttributes
  extends Optional<EmployeeAttr, 'employeeNumber'> {}

// We need to declare an interface for our model that is basically what our class would be
interface DeptInstance
  extends Model<EmployeeAttr, EmployeeCreationAttributes>,
    EmployeeAttr {}

const Employee = db.define<DeptInstance>(
  'employee',
  {
    employeeNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    jobTitle: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Employee.hasOne(Department, { foreignKey: 'employeeNumber' });
Department.belongsTo(Employee, { foreignKey: 'employeeNumber' });
db.sync({ force: true });
export default Employee;
