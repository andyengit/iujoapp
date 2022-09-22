import { DataTypes, Model } from "sequelize";
import database from "../database/index";
require("../database/relations")
import User from "../User/User.Model";

class Log extends Model {
  static async setLog({module, event, entityId , userId}) {
    return await this.create({
      module,
      event,
      entityId,
      userId,
    }, { 
      include: [{model: User}] 
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
    entityId: {
      type: DataTypes.INTEGER(),
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
