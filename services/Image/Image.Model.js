import { DataTypes } from "sequelize";
import database from "../database/index";
import ModelBase from "../ModelBase";

class Image extends ModelBase {

  static async _delete({ id }) {
    try {
      return await this.destroy({ where: { id: id } })
    } catch (_e) {
      return { _e }
    }
  }
}

Image.init(
  {
    path: {
      type: DataTypes.STRING(),
    },
    status: {
      defaultValue: true,
      type: DataTypes.BOOLEAN(),
    }
  },
  {
    timestamps: false,
    sequelize: database,
  }
);

export default Image;
