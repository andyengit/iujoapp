import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import UserController from '../../../services/User/User.Controller';

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const { sessionJWT } = req.cookies
    const User = new UserController(sessionJWT)
    const response = await User.getEntity(req.query.usernamePath);
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .put(async (req, res) => {
    const usernamePath = req.query.usernamePath;
    const { sessionJWT } = req.cookies
    const User = new UserController(sessionJWT)
    const response = await User._updateEntity(usernamePath, req.body);
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .use(onNoMethod);

export default handler;
