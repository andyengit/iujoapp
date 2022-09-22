import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.STRING(15),
      validate: {
        notContains: " ",
      },
      allowNull: false,
    },
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Tag;
