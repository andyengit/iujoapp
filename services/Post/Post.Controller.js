import Post from "./Post.Model";
import { validatePost } from "./utils/validations";
import { cleanData } from "./utils/cleanData";
import Log from "../Log/Log.Model";
import Image from "../Image/Image.Model"

class PostController {

  static async getPost(id) {
    try {
      const result = await Post.getPost(id);
      if (!result) {
        return { message: "No se ecuentra", status: 404 }
      }
      return { status: 200, post: result };
    } catch (e) {
      return { message: e.message, status: 400 }
    }
  }

  static async getPosts(options = { page: 0, limit: 5, tags, userId, serviceId, search }) {
    try {
      const optionsClean = await cleanData(options);

      let params = {
        limit: parseInt(optionsClean.limit) || 5,
        offset: !!optionsClean.page ? optionsClean.page * 5 : 0,
        search: optionsClean.search,
        tag: optionsClean.tags
      }

      if (optionsClean.userId) {
        return await Post.getPostsByUser({ ...params, id: optionsClean.userId });
      }

      if (optionsClean.serviceId) {
        return await Post.getPostsByService({ ...params, id: optionsClean.serviceId });
      }

      return await Post.getPosts(params);
    } catch (e) {
      return { message: error.message, status: 400 };
    }
  }

  static async createPost(query, file = false) {
    try {
      const data = cleanData({ ...query });
      const check = validatePost(data);
      if (check.length > 0) {
        return { message: check, status: 200 };
      }
      if (file) {
        data.image = [{ path: file.path.slice(6, file.path.length) }];
      } else {
        data.image = []
      }
      let value = await Post.createPost(data);
      await Log.setLog({ module: "POST", event: "CREATE", userId: data.userId, entityId: value.dataValues.id })
      return { message: "Post creado correctamente", status: 201 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  static async updatePost(id, data, file) {
    try {
      const newData = cleanData({ ...data });
      const check = validatePost(newData);
      if (check.length > 0) {
        return { message: check, status: 401 };
      }
      if (file) {
        data.image = [{ path: file.path.slice(6, file.path.length) }];
        Image._create({ data: { postId: id, path: data.image[0].path } })
      } else {
        data.image = []
      }
      const value = await Post.updatePost(id, newData);
      await Log.setLog({ module: "POST", event: "UPDATE", userId: value.userId, entityId: id })
      return { message: "Post actualizado correctamente", status: 201 }
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  }

  static async deletePost(id) {
    try {
      await Post.deletePost(id);
      await Log.setLog({ module: "POST", event: "DELETE", userId: 1, entityId: id })
      return { message: "Post Eliminado Correctamente", status: 201 }
    } catch (error) {
      return { message: error.message, status: 400 }
    }
  }
}

export default PostController;
