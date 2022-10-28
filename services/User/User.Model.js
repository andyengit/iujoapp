import { DataTypes, Model } from 'sequelize';
import database from "../database/index";
require("../database/relations");
import Group from "../Group/Group.Model";
import Service from '../Service/Service.Model';
import UsersServices from "../UsersServices/UsersServices.Model";

class User extends Model {

  static async getUsers() {
    return await this.findAll({
      attributes: ['id', 'name', 'email', 'username', 'groupId'],
    })
  }

  static async getUser(username) {
    return await this.findOne({
      where: { username: username },
      attributes: ['id', 'name', 'status', 'email', 'username', 'groupId'],
      include: [
        { model: Group, as: "group" },
        {
          model: UsersServices, attributes: ['serviceId', 'isCoordinator'],
          include: [{ model: Service, attributes: ['name'], as: 'users' }]
        }
      ]
    });
  }

  static async getUserPassword(username) {
    return await this.findAll({
      where: { username: username },
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
