import { DataTypes } from "sequelize";
import ModelBase from "../ModelBase";
import database from "../database/index";
import UsersServices from "../UsersServices/UsersServices.Model";
import User from "../User/User.Model"
require('../database/relations')

class Service extends ModelBase {

  static async _create({ data }) {
    const newData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      description: data.description,
      path: data.path,
      UsersServices: {
        userId: data.coordinator,
        isCoordinator: 1
      }
    }
    return await super._create({
      data: newData, _query: {
        include: [{ model: UsersServices }]
      }
    })
  }

  static async _getEntities() {
    return await super._getEntities({
      _query: {
        include: [
          {
            model: UsersServices,
            order: [['isCoordinator', 'DESC']],
            include: {
              model: User, as: 'services',
              attributes: ['name', 'username']
            }
          }
        ]
      }
    })
  }

  static async _getEntity({ _path }) {
    return await super._getEntity({
      _query: {
        where: { path: _path },
        include: [
          {
            model: UsersServices,
            where: { isCoordinator: 1 },
            attributes: ['userId', 'isCoordinator'],
            include: {
              model: User, as: 'services',
              attributes: ['name', 'username']
            }
          }
        ]
      }
    });
  }
}

Service.init(
  {
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Service;
