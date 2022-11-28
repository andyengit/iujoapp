import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import LogController from "../../../services/Log/Log.Controller.js";
import genHTML from "../../../utils/genReport";

const handler = nc(handleApiError)
  .get(async (req, res) => {
    const { dstart, dend, user } = req.query;
    const response = await LogController.getReport({ dstart, dend, user });
    genHTML(response,dstart,dend)
    res.status(response.status).json(response);
  })
  .use(onNoMethod);

export default handler;
