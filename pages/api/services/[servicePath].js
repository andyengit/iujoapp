import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import ServiceController from "../../../services/Service/Service.Controller";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const name = req.query.servicePath
    const { sessionJWT } = req.cookies
    const S = new ServiceController(sessionJWT)
    const response = await S.getEntity(name);
    res.status(S._res_status).json({ ...response, message: S._res_message });
  })
  .put(async (req, res) => {
    const id = req.query.servicePath
    const data = req.body
    const { sessionJWT } = req.cookies
    const S = new ServiceController(sessionJWT)
    const response = await S._updateEntity(id, data);
    res.status(S._res_status).json({ ...response, message: S._res_message });
  })
  .use(onNoMethod);

export default handler;
