import Log from "./Log.Model";

class LogController{
  static async getLogs(){
    const logs = await Log.getLogs()
    if (!logs){
      return {status: 404, message: "No hay logs disponibles"}
    }
    return {status: 200, logs}
  }
}

export default LogController;
