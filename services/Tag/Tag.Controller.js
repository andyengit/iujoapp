import Controller from "../Controller";
import Tag from "./Tag.Model";

class TagController extends Controller{
  constructor(token){
    super()
    this._name = 'etiqueta'
    this._nameP = "etiquetas"
    this._model = Tag
    this._token = token
  }
}

export default TagController;
