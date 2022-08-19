import Post from "./Post.Model";
import { validatePost } from "./utils/validations";
import { cleanData } from "./utils/cleanData";

class PostController {
  static async getPosts(options = { page: 0, limit: 5 }) {
    const optionsClean = await cleanData(options);
    const { page, limit } = optionsClean;
    return await Post.getPosts({ limit: 5, offset: !!page ? page * 5 : 0 });
  }

  static async createPost(query) {
    const data = cleanData(query);
    try {
      const check = validatePost(data);
      if (check.length > 0) {
        throw new Error(check);
      } else {
        await Post.createPost(data);
        return { message: "Post creado correctamente" };
      }
    } catch (error) {
      return error.message;
    }
  }
}

export default PostController;
