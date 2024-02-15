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

handler.get(async (req, res) => {
  const { page, search, user, service, tags, limit } = req.query;
  res.json(await PostController.getPosts({ page: page || 0, search: search || false, userId: user || false, serviceId: service || false, tags: tags || false, limit: limit || 5 }));
})
handler.use(handleFile)
handler.use(notAuthorized)
handler.post(async (req, res) => {
  const value = await PostController.createPost(req.body, req.file);
  res.status(value.status).json(value);
})

export default handler;
