import Career from "./Career.Model";
import verifyToken from "../../utils/handleToken";
import Controller from "../Controller";

class CareerController extends Controller{
  constructor(token){
    super()
    this._name = 'carrera'
    this._nameP = "carreras"
    this._model = Career
    this._token = token
  }
}

export default CareerController
