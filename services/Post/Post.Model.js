import { DataTypes, Model, Op } from "sequelize";
import database from "../database/index";
require("../database/relations");
import User from "../User/User.Model";
import Image from "../Image/Image.Model";
import Tag from "../Tag/Tag.Model";
import Service from "../Service/Service.Model";

class Post extends Model {
  static async getPost(id) {
    return this.findOne({
      attributes: ["id", "title", "content", "updatedAt", "anchored"],
      where: { id: id, status: true },
      include: [
        { model: User, attributes: ["id", "name"], as: "autor" },
        { model: Image, attributes: ["id", "path"], as: 'images' },
        { model: Tag, attributes: ['id', 'name'], as: 'tags' },
        { model: Service, attributes: ['name'] }
      ],
    })
  }

  static async getPosts(options = { limit: 5, offset: 0 }) {
    const { limit, offset, search } = options;

    let query = {
      attributes: ["id", "title", "content", "updatedAt", "anchored"],
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
      include: [
        { model: User, attributes: ["id", "name"], as: "autor" },
        { model: Image, attributes: ["id", "path"], as: 'images' },
        { model: Tag, attributes: ['id', 'name'], as: 'tags' },
        { model: Service, attributes: ['name'] }
      ],
    }

    if (search) {
      query = {
        ...query, where: {
          title: {
            [Op.like]: `%${search}%`,
          },
          status: true,
        },
      }
    }

    const { count, rows } = await this.findAndCountAll(query);
    return { count, rows };
  }

  static async getPostsByService(options = { limit: 5, offset: 0, id }) {
    const { limit, offset, id, search } = options;
    let query = {
      attributes: ["id", "title", "content", "updatedAt", "anchored"],
      where: { serviceId: id, status: true },
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
      include: [
        { model: User, attributes: ["id", "name"], as: "autor" },
        { model: Image, attributes: ["id", "path"], as: 'images' },
        { model: Tag, attributes: ['id', 'name'], as: 'tags' },
        { model: Service, attributes: ['name'] }
      ],
    }

    if (search) {
      query = {
        ...query, where:
        {
          ...query.where,
          title: { [Op.like]: `%${search}%` },
        }
      }
    }

    const { count, rows } = await this.findAndCountAll(query);
    return { count, rows };
  }

  static async getPostsByUser(options = { limit: 5, offset: 0, id }) {
    const { limit, offset, id, search } = options;
    let query = {
      attributes: ["id", "title", "content", "updatedAt", "anchored"],
      where: { userId: id, status: true },
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
      include: [
        { model: User, attributes: ["id", "name"], as: "autor" },
        { model: Image, attributes: ["id", "path"], as: 'images' },
        { model: Tag, attributes: ['id', 'name'], as: 'tags' },
        { model: Service, attributes: ['name'] }
      ],
    }

    if (search) {
      query = {
        ...query, where:
        {
          ...query.where,
          title: { [Op.like]: `%${search}%` },
        }
      }
    }

    const { count, rows } = await this.findAndCountAll(query)
    return { count, rows };
  }


  static async createPost(data) {
    return await this.create(
      {
        title: data.title,
        content: data.content,
        userId: data.userId,
        imageId: data.imageId || null,
        createAt: new Date(),
        updateAt: new Date(),
        tags: data.tags || null,
        serviceId: data.serviceId || null,
        images: data.image
      },
      {
        include: [
          { model: User, as: "autor" },
          { model: Tag, as: 'tags' },
          { model: Service },
          { model: Image, as: 'images' }]
      }
    );
  }

  static async updatePost(id, data) {
    const postData = await this.findOne({ where: { id: id } });
    if (postData) {
      const { dataValues } = postData
      const newData = { ...dataValues, ...data, updateAt: new Date() }
      await this.update(newData, { where: { id: id } });
      if (!!data.tags && data.tags.length > 0) {
        await data.tags.map(async (el) => {
          await Tag.create({
            ...el,
            postId: id
          },
            {
              include: [{
                model: Post,
                as: 'tags'
              }]
            })
        })
      }

      if (!!data.deleteTags && data.deleteTags.length > 0) {
        await data.deleteTags.map(async (el) => {
          await Tag.destroy({ where: { id: el } })
        })
      }
      return newData;
    }
  }

  static async deletePost(id) {
    return await this.update({status: false},{ where: { id } });
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
      defaultValue: false,
    },
    status:{
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    sequelize: database,
  }
);

export default Post;
