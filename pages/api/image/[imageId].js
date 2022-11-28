import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import ImageController from "../../../services/Image/Image.Controller";

const handler = nc(handleApiError)
  .delete(async (req, res) => {
    const { sessionJWT } = req.cookies
    const Image = new ImageController(sessionJWT)
    const response = await Image.deleteEntity(req.query.imageId);
    res.status(Image._res_status).json({ ...response, message: Image._res_message });
  })
  .use(onNoMethod);

export default handler;
