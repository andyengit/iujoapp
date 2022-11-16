import { DataTypes } from "sequelize";
import database from "../database/index";
import ModelBase from "../ModelBase";

class Event extends ModelBase {
}

Event.init(
  {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT(),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: 0,
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

export default Event;
