import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import ServiceController from "../../../services/Service/Service.Controller";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const { sessionJWT } = req.cookies
    const S = new ServiceController(sessionJWT)
    const response = await S.getEntities();
    res.status(S._res_status).json({ ...response, message: S._res_message });
  })
  .post(async (req, res) => {
    const data = req.body
    const { sessionJWT } = req.cookies
    const S = new ServiceController(sessionJWT)
    const response = await S.create(data);
    res.status(S._res_status).json({ ...response, message: S._res_message });
  })
  .use(onNoMethod);

export default handler;
