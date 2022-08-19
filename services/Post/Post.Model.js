import { DataTypes, Model } from "sequelize";
import database from "../database/index";
import { PostRelations } from "../database/relations";
import User from "../User/User.Model";
import Image from "../Image/Image.Model";
import Tag from "../Tag/Tag.Model";

class Post extends Model {
  static async getPosts(options = { limit: 5, offset: 0 }) {
    PostRelations();
    const { limit, offset } = options;
    const { count, rows } = await this.findAndCountAll({
      attributes: ["id", "title", "content"],
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: Image },
        { model: Tag },
      ],
    });
    const newRows = rows.map((row) => row.dataValues);
    return { count, rows: newRows };
  }

  static async createPost(data) {
    PostRelations();
    return await this.create(
      {
        title: data.title,
        content: data.content,
        userId: data.userId,
        imageId: data.imageId,
        createAt: new Date(),
        updateAt: new Date(),
      },
      {
        include: [{ model: User }, { model: Image }],
      }
    );
  }

  static async updatePost(data) {
    const postData = await this.findOne({ where: { id: data.id } });
    let newData = { ...postData };
    if (Post) {
      newData = { ...newData, ...data, updateAt: new Date() };
      return await this.update(newData, { where: { id: data.id } });
    }
  }

  static async deletePost(id) {
    return await this.destroy({ where: { id } });
  }
}

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
