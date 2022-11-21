import { DataTypes } from "sequelize";
import database from "../database/index";
import ModelBase from "../ModelBase";
import User from "../User/User.Model";

class UsersServices extends ModelBase {
  static async _getEntities({ _path }) {
    let obj = false
    if (!!_path) {
      obj = {
        _query: {
          where: { serviceId: _path },
          include: {
            model: User, as: 'services',
            attributes: ['name', 'username']
          }
        }
      }
    }
    return await super._getEntities(obj)
  }
}

UsersServices.init({
  isCoordinator: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  timestamps: false,
  sequelize: database
})

export default UsersServices;
