import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Image extends Model {}

Image.init(
  {
    path: {
      type: DataTypes.STRING(),
    },
  },
  {
    timestamps: false,
    sequelize: database,
  }
);

export default Image;
