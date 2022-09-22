import {Model} from "sequelize";
import database from "../database/index";

class UsersServices extends Model{
}

UsersServices.init({

},{
  timestamps: false,
  sequelize: database
})

export default UsersServices;
