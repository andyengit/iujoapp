import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import EventController from "../../../services/Event/Event.Controller";

const handler = nc(handleApiError)
  .get(async(req, res) => {
    const { sessionJWT } = req.cookies
    const Event = new EventController(sessionJWT)
    const response = await Event.getEntities();
    res.status(Event._res_status).json({ ...response, message: Event._res_message });
  })
  .post(async (req, res) => {
    const { sessionJWT } = req.cookies
    const Event = new EventController(sessionJWT)
    const response = await Event.create(req.body);
    res.status(Event._res_status).json({ ...response, message: Event._res_message });
  })
  .use(onNoMethod);

export default handler;
