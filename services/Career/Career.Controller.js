import Career from "./Career.Model";

class CareerController {
  static async getCareers() {
    const careers = await Career.getCareers()
    if (!careers) {
      return { status: 404, message: "No hay carreras disponibles" }
    }
    return { status: 200, careers: careers }
  }

  static async getCareer(path) {
    const career = await Career.getCareer(path)
    if (!career) {
      return { status: 404, message: "No existe la carrera" }
    }
    return { status: 200, career: career }
  }


  static async updateCareer(id, data){
    const career = await Career.updateCareer(id,data)
    if (!career){
      return {status: 404, message: "No existe la Carrera"}
    }
    const newCareer = await Career.getCareerById(id);
    return {status: 203, career: newCareer}
  }
}

export default CareerController
