import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import Controller from "../../../services/Tag/Tag.Controller";

const handler = nc(handleApiError)
  .get(async(req, res) => {
    const { sessionJWT } = req.cookies
    const User = new Controller(sessionJWT)
    const response = await User.getEntities();
    res.status(User._res_status).json({ ...response, message: User._res_message });
  })
  .use(onNoMethod);

export default handler;
