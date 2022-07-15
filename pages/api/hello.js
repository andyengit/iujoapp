import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../utils/handleApiError";

const handler = nc(handleApiError)
  .get((req, res) => {
    res.send("Hello world");
  })
  .post((req, res) => {
    res.json({ hello: "world" });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  })
  .use(onNoMethod);

export default handler;
