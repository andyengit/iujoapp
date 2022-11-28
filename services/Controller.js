import { verifyToken } from "../utils/handleToken";
import Log from "./Log/Log.Model";

class Controller {
  _name = "";
  _nameP = "";
  _model = false;
  _token = "";
  _user = {}
  _user_adm = false
  _res_status = 200;
  _res_message = ""

  _getError({_e}){
    if(_e.parent){
      return _e.parent.sqlMessage
    }
    if(_e.errors){
      return _e.errors.map(el => el.message).join(", ")
    }
    return "Algo ha fallado"
  }

  async _verifyUser() {
    this._user = await verifyToken(this._token)
    if (!this._user) {
      return
    }

    if (this._user.group.isAdmin) {
      this._user_adm = true
    }
  }

  async create(data) {
    await this._verifyUser()
    if (!this._user) {
      this._res_status = 403;
      this._res_message = `No estas autorizado para esta accion`
      return
    }

    const entity = await this._model._create({ data })
    if (!entity) {
      this._res_status = 404;
      this._res_message = `No hay ${this._name} disponibles`
      return
    }


    if (entity._e !== undefined) {
      this._res_status = 400
      this._res_message = this._getError(entity) 
      return
    }

    Log.setLog({
      module: this._name.toUpperCase(),
      event: "CREATE",
      entityId: entity.dataValues.id,
      userId: this._user.id
    });
    this._res_message = `${this._name} Creado correctamente`

    const { dataValues } = entity
    return { ...dataValues }
  }

  async getEntities(data) {
    await this._verifyUser()
    const entities = await this._model._getEntities({
      _path: data,
      isAdmin: this._user_adm
    })

    if (!entities || (entities && entities.rows && entities.rows.length === 0)) {
      this._res_status = 404
      this._res_message = `No hay ${this._nameP} disponibles`
      return
    }

    if (entities._e !== undefined) {
      this._res_status = 400
      this._res_message = this._getError(entities)
      return
    }

    this._res_message = `${this._nameP} encontradas.`
    return { ...entities }
  }

  async getEntity(path) {
    await this._verifyUser()
    const entity = await this._model._getEntity({
      _path: path,
      isAdmin: this._user_adm
    })

    if (!entity) {
      this._res_status = 404
      this._res_message = `No existe la ${this._name}`
      return
    }

    if (entity._e !== undefined) {
      this._res_status = 400
      this._res_message = this._getError(entity)
      return
    }

    const { dataValues } = entity

    this._res_message = `${this._name} encontrada.`
    return { ...dataValues }
  }

  async _updateEntity(id, data) {
    await this._verifyUser()
    if (!this._user) {
      this._res_status = 403
      this._res_message = "No estas autorizado"
    }
    const entity = await this._model._updateEntity({ id, data })

    if (!entity[0]) {
      this._res_status = 404;
      this._res_message = `La ${this._name} no existe.`
      return
    }

    if (entity._e !== undefined) {
      this._res_status = 400
      this._res_message = this._getError(entity)
      return
    }

    Log.setLog({
      module: this._name.toUpperCase(),
      event: "UPDATE",
      entityId: id,
      userId: this._user.id
    });

    this._res_status = 203
    this._res_message = `${this._name} ha sido actualizada`

    return
  }

  async deleteEntity(id) {
    await this._verifyUser()
    if (!this._user) {
      this._res_status = 403
      this._res_message = "No estas autorizado"
    }
    const entity = await this._model._delete({ id })

    if (!entity[0] && entity !== 1) {
      this._res_status = 404;
      this._res_message = `La ${this._name} no existe.`
      return
    }

    if (entity._e !== undefined) {
      this._res_status = 400
      this._res_message = this._getError(entity)
      return
    }

    Log.setLog({
      module: this._name.toUpperCase(),
      event: "DELETE",
      entityId: id,
      userId: this._user.id
    });

    this._res_status = 203
    this._res_message = `${this._name} se ha eliminado`

    return
  }
}

export default Controller
