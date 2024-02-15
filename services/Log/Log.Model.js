import sequelize, { DataTypes, Model, Op } from "sequelize";
import database from "../database/index";
require("../database/relations")
import User from "../User/User.Model";

class Log extends Model {

  static async getLogs(dateStart,dateEnd) {
    dateEnd += " 23:59:59"
    let where = {
      createdAt: { [Op.between]: [dateStart, dateEnd] }
    }
    if (dateStart === dateEnd) {
      where = { createdAt: dateEnd }
    }
    return await this.findAll({
      where: where,
      limit: 100,
      order: [['id', 'DESC']],
      include: [{ model: User, attributes: ['username'] }]
    })
  }

  static async getReport(dateStart, dateEnd) {
    dateEnd += " 23:59:59"
    let where = {
      createdAt: { [Op.between]: [dateStart, dateEnd] }
    }
    if (dateStart === dateEnd) {
      where = { createdAt: dateEnd }
    }
    try {
      return await this.findAll({
        where: where,
        attributes: [
          "module",
          "event",
          [sequelize.fn("COUNT", sequelize.col("event")), "count"],
        ],
        group: ["module", 'event'],
        order: [[sequelize.fn("COUNT", sequelize.col("event")), "DESC"]],
      });
    } catch (_e) {
      return { _e }
    }
  }

  static async setLog({ module, event, entityId, userId }) {
    return await this.create({
      module,
      event,
      entity: entityId,
      userId,
    }, {
      include: [{ model: User }]
    })
  }
}

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
    entity: {
      type: DataTypes.STRING(),
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
