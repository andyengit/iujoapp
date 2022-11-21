import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import { createToken } from "../../../utils/handleToken"

const handler = nc(handleApiError)
  .post(async (req, res) => {
    const password = req.body.password;
    const user = req.body.user;
    require("dotenv").config();
    const SYSTEM_KEY = process.env.SYSTEM_KEY;
    if (password !== SYSTEM_KEY) {
      return res.status(400).json({
        message: "Ha ingresado la clave de producto incorrecta, porfavor contacta con el soporte."
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "No se ha ingresado los datos del administrador."
      });
    }
    const token = await createToken({ password, user: {} })
    return res.status(200).json({
      token: token,
      user
    })
  })
  .use(onNoMethod);

export default handler;
