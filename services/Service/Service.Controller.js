import Controller from "../Controller";
import Service from "./Service.Model"

class ServiceController extends Controller{

  constructor(token) {
    super()
    this._name = 'servicio'
    this._nameP = "servicios"
    this._model = Service
    this._token = token
  }
}

export default ServiceController
