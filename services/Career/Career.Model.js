import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Career extends Model {
  static async getCareers() {
    const { rows, count } = await this.findAndCountAll()
    return { rows, count }
  }

  static async getCareer(path) {
    const career = await this.findOne({
      where: { path: path }
    })
    return career
  }

  static async getCareerById(id) {
    const career = await this.findOne({
      where: { id: id }
    })
    return career
  }

  static async updateCareer(id, data) {
    const career = await this.update(data, {
      where: { id: id }
    })
    console.log(career)
    return career
  }
}

Career.init(
  {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    coordinator: {
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
    profile: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(20),
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
