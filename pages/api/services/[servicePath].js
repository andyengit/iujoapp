import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import ServiceController from "../../../services/Service/Service.Controller";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const name = req.query.servicePath
    const response = await ServiceController.getService(name);
    if (response.status !== 200){
      res.status(response.status).json(response);
    }
    res.status(response.status).json(response)
  })
  .use(onNoMethod);

export default handler;
