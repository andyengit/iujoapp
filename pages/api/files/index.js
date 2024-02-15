import nc from "next-connect";
import { handleApiError } from "../../../utils/handleApiError";
import handleFile from "../../../utils/handleFile";

export const config = {
  api: {
    bodyParser: false,
  }
}

const handler = nc(handleApiError)

handler.use(handleFile)
handler.post(async (req, res) => {
  res.status(200).json({filename: req.file.path.slice(6,req.file.path.length)});
})


export default handler
