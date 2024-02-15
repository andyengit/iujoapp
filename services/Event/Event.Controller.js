import Controller from "../Controller";
import Event from "./Event.Model";

class EventController extends Controller{
  constructor(token){
    super()
    this._name = 'evento'
    this._nameP = "eventos"
    this._model = Event
    this._token = token
  }
}

export default EventController;
