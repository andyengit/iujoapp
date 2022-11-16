import { DataTypes, Model } from "sequelize";
import database from "../database/index";
require("../database/relations")
import User from "../User/User.Model";

class Log extends Model {

  static async getLogs() {
    return await this.findAll({ 
      limit: 100, 
      order: [['id', 'DESC']], 
      include: [{ model: User, attributes: ['username'] }] })
  }

  static async setLog({ module, event, entityId, userId }) {
    return await this.create({
      module,
      event,
      entity : entityId,
      userId,
    }, {
      include: [{ model: User }]
    })
  }
}

Log.init(
  {
    module: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    event: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    sequelize: database,
  }
);

export default Log;
