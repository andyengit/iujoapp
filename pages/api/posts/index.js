import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import PostController from "../../../services/Post/Post.Controller";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const { page } = req.query;
    res.json(await PostController.getPosts({page: page || 0 }));
  })
  .post(async (req, res) => {
    res.json(await PostController.createPost(req.body));
  })
  .use(onNoMethod);

export default handler;
