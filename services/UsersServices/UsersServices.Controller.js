import UsersServices from "./UsersServices.Model";
import Controller from "../Controller";

class USController extends Controller{
  constructor(token){
    super()
    this._name = 'U-S'
    this._nameP = "U-S"
    this._model = UsersServices
    this._token = token
  }
}

export default USController
