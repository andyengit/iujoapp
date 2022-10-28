import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import CareerController from "../../../services/Career/Career.Controller";

const handler = nc(handleApiError)
  .get(async (req,res) => { 
    const response = await CareerController.getCareers()
    res.status(response.status).json(response); 
  })
  .use(onNoMethod);

export default handler;
