import nc from "next-connect";
import { handleApiError, onNoMethod, notAuthorized } from "../../../utils/handleApiError";
import PostController from "../../../services/Post/Post.Controller";
import handleFile from "../../../utils/handleFile";

export const config = {
  api: {
    bodyParser: false,
  }
}

const handler = nc(handleApiError)
handler.get(async (req,res) => {
  const id = req.query.postId
  const action = await PostController.getPost(id)
  res.status(200).json(action)
})
handler.use(handleFile)
handler.use(notAuthorized)
handler.put(async (req, res) => {
    const id = req.query.postId;
    const action = await PostController.updatePost(id, req.body)
    res.status(action.status).json(action)
  })
handler.delete(async (req,res) => {
    const id = req.query.postId;
    const action = await PostController.deletePost(id)
    res.status(action.status).json(action)
  })
  .use(onNoMethod);

export default handler;
