import {Model, DataTypes} from "sequelize";
import database from "../database/index";

class UsersServices extends Model{
}

UsersServices.init({
  isCoordinator: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
},{
  timestamps: false,
  sequelize: database
})

export default UsersServices;
