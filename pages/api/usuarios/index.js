import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";

const handler = nc(handleApiError)
  .get((req, res) => {
    res.send("Hello world");
  })
  .use(onNoMethod);

export default handler;
