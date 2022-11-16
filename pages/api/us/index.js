import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import USController from "../../../services/UsersServices/UsersServices.Controller";

const handler = nc(handleApiError)
  .get(async(req, res) => {
    const { service } = req.query
    const { sessionJWT } = req.cookies
    const User = new USController(sessionJWT)
    const response = await User.getEntities(service);
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .post(async (req, res) => {
    const { sessionJWT } = req.cookies
    const User = new USController(sessionJWT)
    const response = await User.create(req.body);
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .put(async(req, res) => {
    const { id } = req.query
    const { sessionJWT } = req.cookies
    const User = new USController(sessionJWT)
    const response = await User._updateEntity(id,req.body);
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .delete(async (req, res) => {
    const { sessionJWT } = req.cookies
    const User = new USController(sessionJWT)
    console.log(req.query)
    const response = await User.deleteEntity(req.query.service);
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .use(onNoMethod);

export default handler;
