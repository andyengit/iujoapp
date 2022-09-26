import nc from "next-connect";
import { handleApiError, onNoMethod, notAuthorized } from "../../../utils/handleApiError";
import PostController from "../../../services/Post/Post.Controller";


const handler = nc(handleApiError)

handler.get(async (req, res) => {
    const { page, user, service, limit } = req.query;
    console.log(req.query)
    res.json(await PostController.getPosts({page: page || 0, userId : user || false, serviceId: service || false, limit: limit || 5}));
  })
handler.use(notAuthorized);
handler.post(async (req, res) => {
    console.log(req.body)
    const value = await PostController.createPost(req.body);
    console.log(value)
    res.status(value.status).json(value);
  })
handler.use(onNoMethod);

export default handler;
