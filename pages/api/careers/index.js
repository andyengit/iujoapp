import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import CareerController from "../../../services/Career/Career.Controller";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const { sessionJWT } = req.cookies
    const Career = new CareerController(sessionJWT)
    const response = await Career.getEntities()
    res.status(Career._res_status).json({ ...response, message: Career._res_message });
  })
  .post(async (req, res) => {
    const { sessionJWT } = req.cookies
    const Career = new CareerController(sessionJWT)
    const response = await Career.create(req.body)
    res.status(Career._res_status).json({ ...response, message: Career._res_message });
  })
  .use(onNoMethod);

export default handler;
