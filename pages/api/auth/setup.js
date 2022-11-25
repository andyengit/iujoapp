import nc from "next-connect";
import { handleApiError, onNoMethod } from "../../../utils/handleApiError";
import { createToken } from "../../../utils/handleToken"
import { hashPassword } from "../../../utils/handleCrypt";

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

    let newUser = {}
    if (user) {
      if (!user.name || !user.email || !user.password) {
        return res.status(400).json({
          message: "Debe ingresar todos los campos para crear el usuario administrador."
        });
      }
      let passwordHashed = await hashPassword(user.password);
      newUser = { ...user, password: passwordHashed }
    }

    const token = await createToken({ password, user: newUser })
    return res.status(200).json({
      token: token
    })

  })
  .use(onNoMethod);

export default handler;
