import { DataTypes, Model } from "sequelize";
import database from "../database/index";
import UsersServices from "../UsersServices/UsersServices.Model";
import User from "../User/User.Model"
require('../database/relations')

class Service extends Model {
  static async getService(name) {
    return await this.findOne({
      where: { name: name },
      include: [
        {
          model: UsersServices,
          where: { isCoordinator: 1 },
          attributes: ['userId','isCoordinator'],
          include: {
            model: User, as: 'services',
            attributes: ['name','username']
          }
        }
      ]
    });
  }
}

Service.init(
  {
    name: {
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
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Service;
