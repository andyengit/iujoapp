import nc from "next-connect";
import { handleApiError, onNoMethod, notAuthorized } from "../../../utils/handleApiError";
import EventController from "../../../services/Event/Event.Controller";

const handler = nc(handleApiError)
handler.put(async (req, res) => {
  const id = req.query.eventPath
  const body = req.body
  const { sessionJWT } = req.cookies
  const Event = new EventController(sessionJWT)
  const response = await Event._updateEntity(id, body);
  res.status(Event._res_status).json({ ...response, message: Event._res_message });
})
handler.use(onNoMethod);

export default handler;
