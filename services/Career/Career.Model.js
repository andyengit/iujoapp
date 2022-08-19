import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Career extends Model {}

Career.init(
  {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    coordinator:{
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: 1,
    }
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Career;
