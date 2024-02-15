import { Model } from "sequelize";

class ModelBase extends Model {

  static async _delete({ id, _query }) {
    try {
      let query = _query || false;
      if (!query) {
        query = {
          where: { id: id }
        }
      }

      return await this.update({ status: false }, query)

    } catch (_e) {
      return { _e }
    }
  }

  static async _create({ data, _query }) {
    try {
      let query = _query || false;

      return await this.create(data, query || {})
    } catch (_e) {
      return { _e }
    }
  }

  static async _getEntities({ _query, isAdmin }) {
    try {
      let query = _query || false;
      if (!isAdmin) {
        query = {
          ...query, where: {
            ...query.where, status: true
          }
        }
      }

      const { rows, count } = await this.findAndCountAll(query || {})
      return { rows, count }
    } catch (_e) {
      return { _e }
    }
  }

  static async _getEntity({ _path, _query, isAdmin }) {
    try {
      let query = _query || false;
      if (!query) {
        query = {
          where: { path: _path }
        }
      }
      if (!isAdmin) {
        query = {
          ...query,
          where: { ...query.where, status: true }
        }
      }
      const entity = await this.findOne(query || {})
      return entity
    } catch (_e) {
      return { _e }
    }
  }

  static async _updateEntity({ id, data, _query }) {
    try {
      let query = _query || false;
      if (!query) {
        query = {
          where: { id: id }
        }
      }

      return await this.update(data, query)
    } catch (_e) {
      return { _e }
    }
  }
}

export default ModelBase
