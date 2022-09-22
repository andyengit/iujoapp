import { DataTypes, Model } from "sequelize";
import database from "../database/index";
require("../database/relations");
import User from "../User/User.Model";
import Image from "../Image/Image.Model";
import Tag from "../Tag/Tag.Model";
import Service from "../Service/Service.Model";

class Post extends Model {
  static async getPosts(options = { limit: 5, offset: 0 }) {
    const { limit, offset } = options;
    const { count, rows } = await this.findAndCountAll({
      attributes: ["id", "title", "content","updatedAt"],
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
      include: [
        { model: User, attributes: ["id", "name"], as: "autor" },
        { model: Image },
        { model: Tag, attributes: ['name'] , as: 'tags'},
        { model: Service }
      ],
    });
    return { count, rows };
  }

  static async createPost(data) {

    const tags = await data.tags.map((el) => {return {name: el}});

    return await this.create(
      {
        title: data.title,
        content: data.content,
        userId: data.userId,
        imageId: data.imageId || null,
        createAt: new Date(),
        updateAt: new Date(),
	tags: tags || null,
	serviceId: data.serviceId || null
      },
      {
	include: [
	{ model: User, as: "autor"}, 
	{ model: Tag, as: 'tags' },
	{ model: Service },
	{ model: Image }] 
      }
    );
  }

  static async updatePost(id, data) {
      const postData = await this.findOne({ where: { id: id } });
      if (postData) {
        const {dataValues} = postData
        const newData = {...dataValues, ...data, updateAt: new Date()}
        await this.update(newData, { where: { id: id } });
        return newData;
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
    anchored: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false
    }
  },
  {
    timestamps: true,
    sequelize: database,
  }
);

export default Post;
