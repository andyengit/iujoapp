import User from "./User.Model";
import { createToken, verifyToken } from '../../utils/handleToken';

class UserController {
  static async login({username,password}){
    const users = await User.getUserPassword(username);
    if (users.length === 0)  {
      return {status: 400, message: "Usuario no registrado"};
    }
    
    if (users[0].dataValues.password !== password) {
      return {status: 401, message: "Contraseña incorrecta"};
    }

    const user = await User.getUser(username)

    const token = await createToken(user[0].dataValues)

    if (!token) return {status: 401, message: "Error"}   
    return {status: 201 ,token: token, user: user[0].dataValues}
  }

  static async getData(token){
    try{
      const payload = await verifyToken(token)
      const { username } = await payload;
      const user = await User.getUser(username)
      return {status: 200, user: user[0].dataValues}
    }catch(error){
      return {status: 401, message: error.message}
    }
  }
}

export default UserController
