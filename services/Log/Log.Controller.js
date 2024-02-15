import Log from "./Log.Model";

class LogController {
  static async getReport({ dstart, dend, user }) {
    const report = await Log.getReport(dstart,dend)

    if (!report) {
      return { status: 400, message: "No hay logs disponibles" }
    }

    let newData = []
    for (let data in report) {
      let value = report[data].dataValues
      newData = { ...newData }
      newData[value.module] = { ...newData[value.module] }
      newData[value.module][value.event] = value.count
    }

    const logs = await Log.getLogs(dstart,dend)
    if (!logs) {
      return { status: 404, message: "No hay logs disponibles" }
    }
    return { status: 200, report: newData, logs }
  }
}

export default LogController;
