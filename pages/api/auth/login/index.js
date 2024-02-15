import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../../utils/handleApiError";
import UserController from "../../../../services/User/User.Controller";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const User = new UserController(req.query.token)
    const response = await User.getData()
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .post(async (req, res) => {
    const User = new UserController()
    const response = await User.login(req.body)
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .use(onNoMethod);

export default handler;
