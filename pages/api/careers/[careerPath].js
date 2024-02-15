import nc from "next-connect";
import { handleApiError, onNoMethod, notAuthorized } from "../../../utils/handleApiError";
import CareerController from "../../../services/Career/Career.Controller";

const handler = nc(handleApiError)
handler.get(async (req, res) => {
  const path = req.query.careerPath
  const { sessionJWT } = req.cookies
  const Career = new CareerController(sessionJWT)
  const response = await Career.getEntity(path)
  res.status(Career._res_status).json({ ...response, message: Career._res_message });
})
handler.put(async (req, res) => {
  const id = req.query.careerPath
  const body = req.body
  const { sessionJWT } = req.cookies
 const Career = new CareerController(sessionJWT)
  const response = await Career._updateEntity(id,body)
  res.status(Career._res_status).json({ ...response, message: Career._res_message });
})
handler.delete(async (req, res) => {
  const id = req.query.careerPath
  const { sessionJWT } = req.cookies
 const Career = new CareerController(sessionJWT)
  const response = await Career.deleteEntity(id)
  res.status(Career._res_status).json({ ...response, message: Career._res_message });
})
handler.use(onNoMethod);

export default handler;
