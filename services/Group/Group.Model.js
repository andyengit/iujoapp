import {DataTypes, Model} from 'sequelize';
import database from "../database/index";

class Group extends Model{}

Group.init({
  name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  isAdmin : {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
    defaultValue: false,
  },
  postApprover: {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
    defaultValue: false,
  }
},{
  sequelize: database,
  timestamps: false,
})

export default Group;
