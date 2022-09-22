import Post from "./Post.Model";
import { validatePost } from "./utils/validations";
import { cleanData } from "./utils/cleanData";
import Log from "../Log/Log.Model";

class PostController {
  static async getPosts(options = { page: 0, limit: 5 }) {
    const optionsClean = await cleanData(options);
    return await Post.getPosts({ limit: optionsClean.limit || 5, offset: !! optionsClean.page ? optionsClean.page * 5 : 0 });
  }

  static async createPost(query) {
    const data = cleanData(query);
    try {
      const check = validatePost(data);
      if (check.length > 0) {
        return {message: check, status: 200};
      }
      let value = await Post.createPost(data);
      await Log.setLog({module: "POST", event: "CREATE",userId: data.userId, entityId: value.dataValues.id }) 
      return { message: "Post creado correctamente", status: 201 };
    } catch (error) {
      return {message: error.message, status: 400};
    }
  }

  static async updatePost(id, data){
    try{
      const newData = cleanData(data);
      const value = await Post.updatePost(id, newData);
      await Log.setLog({module: "POST", event: "UPDATE", userId: value.userId, entityId: id})
      return {message: "Post actualizado correctamente", status: 201}
    }catch(error){
      return {message: error.message, status: 400};
    }
  }

  static async deletePost(id){
    try{
      await Post.deletePost(id);
      await Log.setLog({module: "POST", event: "DELETE", userId: 1, entityId: id})
      return {message: "Post Eliminado Correctamente", status: 201}
    } catch(error){
      return {message: error.message, status: 400}
    }
  }
}

export default PostController;
