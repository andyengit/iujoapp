import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Event extends Model {}

Event.init(
  {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT(),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    url:{
      type: DataTypes.STRING(),
      allowNull: false,  
    },
    important: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Event;
