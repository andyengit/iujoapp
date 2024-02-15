import User from "./User.Model";
import { createToken, verifyToken } from '../../utils/handleToken';
import Controller from "../Controller";
import { comparePassword } from "../../utils/handleCrypt";

class UserController extends Controller {

  constructor(token) {
    super()
    this._name = 'usuario'
    this._nameP = "usuarios"
    this._model = User
    this._token = token
  }

  async login({ username, password }) {
    const users = await User.getUserPassword(username);
    if (users.length === 0) {
      this._res_status = 400;
      this._res_message = "Usuario o contraseña incorrecta"
      return
    }

    const result = await comparePassword(password, users[0].dataValues.password)

    if (!result) {
      this._res_status = 400;
      this._res_message = "Usuario o contraseña incorrecta"
      return
    }

    const { dataValues } = await User._getEntity({ _path: username })
    const token = await createToken(dataValues)
    return { token: token, user: dataValues }
  }

  async getData() {
    this._user = await verifyToken(this._token)
    if (!this._user) {
      this._res_status = 404
      this._res_message = "Token invalido"
    }

    const { dataValues } = await User._getEntity({ _path: this._user.username })
    this._res_message = "Token correcto."
    this._res_status = 201
    return { user: dataValues }
  }
}

export default UserController
