import { DataTypes, Model } from 'sequelize';
import database from '../database/index';

class Setting extends Model {}

Setting.init(
  {
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    value: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,  
    }
  },{
    sequelize: database,
    timestamps: false,    
  });
