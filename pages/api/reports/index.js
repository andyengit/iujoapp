import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import LogController from "../../../services/Log/Log.Controller.js";

const handler = nc(handleApiError)
  .get(async (req,res) => { 
    const response = await LogController.getLogs();
    res.status(response.status).json(response); 
  })
  .use(onNoMethod);

export default handler;
