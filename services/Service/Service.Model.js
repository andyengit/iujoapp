import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Service extends Model {
  static async getService(name){
    return await this.findAll({
      where: {name: name}
    });
  }
}

Service.init(
  {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    coordinator: {
      type: DataTypes.STRING(60),
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
