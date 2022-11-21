import sequelize, { DataTypes } from "sequelize";
import ModelBase from "../ModelBase";
import database from "../database/index";

class Tag extends ModelBase {
  static async _getEntities() {
    try {
      return await this.findAndCountAll({
        attributes: [
          "name",
          [sequelize.fn("COUNT", sequelize.col("name")), "count"],
        ],
        group: "name",
        order: [[sequelize.fn("COUNT", sequelize.col("name")), "DESC"]],
        limit: 5,
      });
    } catch (_e) {
      return { _e }
    }
  }
}

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
