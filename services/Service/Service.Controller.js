import Service from "./Service.Model"

class ServiceController {
  static async getServices() {
    const services = await Service.getServices();
    if (!services) {
      return { status: 400, message: "No hay servicios disponibles" }
    }
    return { status: 200, services }

  }

  static async getService(name) {
    const services = await Service.getService(name);
    if (!services) {
      return { status: 400, message: "No se ha encontrado" }
    }
    return { status: 200, service: await services['dataValues'] }
  }
}

export default ServiceController
