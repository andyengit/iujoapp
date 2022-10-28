import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import UserController from '../../../services/User/User.Controller';

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const response = await UserController.getUser({username: req.query.usernamePath});
    res.status(response.status).json(response);
  })
  .use(onNoMethod);

export default handler;
