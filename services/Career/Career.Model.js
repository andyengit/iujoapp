import { DataTypes} from "sequelize";
import ModelBase from "../ModelBase";
import database from "../database/index";


class Career extends ModelBase { }

Career.init(
  {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    profile: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    pensum: {
      type: DataTypes.STRING(),
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
