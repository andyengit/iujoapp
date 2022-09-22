import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import PostController from "../../../services/Post/Post.Controller";

const handler = nc(handleApiError)
  .put(async (req, res) => {
    const id = req.query.postId;
    const action = await PostController.updatePost(id, req.body)
    if (action.status !== 201) res.status(action.status).json(action.message)
    res.json(action)
  })
  .delete(async (req,res) => {
    const id = req.query.postId;
    const action = await PostController.deletePost(id)
    if (action.status !== 201) res.status(action.status).json(action.message)
    res.json(action)
  })
  .use(onNoMethod);

export default handler;
