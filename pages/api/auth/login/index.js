import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../../utils/handleApiError";
import UserController from "../../../../services/User/User.Controller";

const handler = nc(handleApiError)
  .get(async (req,res) => {
    const response = await UserController.getData(req.query.token)
    res.json(response)
  })
  .post(async (req, res) => {
    try {
      const response = await UserController.login(req.body);
      res.status(response.status).json(response);
    }catch (error){
      res.json(error)
    }
  })
  .use(onNoMethod);

export default handler;
