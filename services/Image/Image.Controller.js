import Controller from "../Controller";
import Image from "./Image.Model";

class EventController extends Controller{
  constructor(token){
    super()
    this._name = 'imagen'
    this._nameP = "imagenes"
    this._model = Image
    this._token = token
  }
}

export default EventController;
