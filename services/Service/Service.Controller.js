import Service from "./Service.Model"

class ServiceController {
  static async getService(name){
    try{
    const services = await Service.getService(name);
    if (services.length > 0){
      return {status: 200, service: await services[0]}

    }
    return {status: 400, message: "No se ha encontrado"}
    }catch(e){
      return {status:  400, message: e.message}
    }
  }
}

export default ServiceController
