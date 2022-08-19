import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Log extends Model {}

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
