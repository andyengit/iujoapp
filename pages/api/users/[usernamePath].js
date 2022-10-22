import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import UserController from '../../../services/User/User.Controller';

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const {usernamePath} = req.query;
    return await UserController.getUser({username: usernamePath});
  })
  .use(onNoMethod);

export default handler;
