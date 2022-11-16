import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import UserController from '../../../services/User/User.Controller';
import { verifyToken } from "../../../utils/handleToken";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const { sessionJWT } = req.cookies
    const User = new UserController(sessionJWT)
    const response = await User.getEntities();
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .post(async (req, res) => {
    const { sessionJWT } = req.cookies
    const User = new UserController(sessionJWT)
    const response = await User.create(req.body);
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .use(onNoMethod);

export default handler;
