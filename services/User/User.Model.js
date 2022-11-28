import { DataTypes, Model } from 'sequelize';
import database from "../database/index";
require("../database/relations");
import Group from "../Group/Group.Model";
import Service from '../Service/Service.Model';
import UsersServices from "../UsersServices/UsersServices.Model";
import ModelBase from "../ModelBase";
import { hashPassword } from "../../utils/handleCrypt";

class User extends ModelBase {

  static async _updateUser({ id, data }) {
    let newData = { ...data }
    if(data.password) {
      let newPassword = await hashPassword(data.password); 
      newData = { ...data, password: newPassword }
    }
    return await super._updateEntity({
      id, data: newData, _query: {
        include: [{ model: Group, as: "group" }],
      }
    })
  }

  static async _getEntities() {
    return await super._getEntities({
      _query: {
        attributes: ['id', 'name', 'status', 'email', 'username', 'groupId', 'image'],
      }
    })
  }

  static async _getEntity({ _path }) {
    return await super._getEntity({
      _query: {
        where: { username: _path },
        attributes: ['id', 'name', 'status', 'email', 'username', 'groupId', 'image'],
        include: [
          { model: Group, as: "group" },
          {
            model: UsersServices, attributes: ['serviceId', 'isCoordinator'],
            include: [{ model: Service, attributes: ['name','path'], as: 'users' }]
          }
        ]
      }
    })
  }

  static async _create({ data }) {
    let newPassword = await hashPassword(data.password);
    let newData = { ...data, password: newPassword }
    return await super._create({
      data: newData, _query: {
        include:
          [{ model: Group, as: "group" }],
      }
    });
  }

  static async getUserPassword(username) {
    return await this.findAll({
      where: { username: username, status: true },
      attributes: ['id', 'name', 'status', 'password']
    });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER(2),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING(255),
    dafaultValue: '/base/logoplus.png',
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
}, {
  timestamps: true,
  sequelize: database,
});

export default User;
