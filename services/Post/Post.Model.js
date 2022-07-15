import { DataTypes, Model } from "sequelize";
import database from "../database/index";

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: database,
  }
);

export default Post;
