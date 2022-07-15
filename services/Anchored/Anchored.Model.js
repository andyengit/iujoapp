import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Anchored extends Model {}

Anchored.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Anchored;
