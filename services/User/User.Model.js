import {DataTypes, Model} from 'sequelize';
import database from "../database/index";

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER(2),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
}, {
  timestamps: true,
  sequelize: database,
});

export default User;
