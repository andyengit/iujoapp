import nc from "next-connect";
import { handleApiError, onNoMethod, notAuthorized } from "../../../utils/handleApiError";
import CareerController from "../../../services/Career/Career.Controller";

const handler = nc(handleApiError)
handler.get(async (req, res) => {
  const path = req.query.careerPath
  const response = await CareerController.getCareer(path)
  res.status(response.status).json(response)
})
handler.put(async (req, res) => {
  const id = req.query.careerPath
  const body = req.body
  console.log(body)
  const response = await CareerController.updateCareer(id, body)
  res.status(response.status).json(response)
})
handler.use(onNoMethod);

export default handler;
