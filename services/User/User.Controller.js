import User from "./User.Model";
import { SignJWT, jwtVerify }from 'jose'

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

    try{
      const jwt = await new SignJWT(user[0].dataValues)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new Uint8Array(process.env.JWT_SECRET))
      return {status: 201 ,token: jwt, user: user[0].dataValues}
    }catch(error){
      return {status: 401, message: error.message}
    }
  }

  static async getData(token){
    try{
      const { payload } = await jwtVerify(token, new Uint8Array(process.env.JWT_SECRET));
      const { username } = payload;
      const user = await User.getUser(username)
      return {status: 200, user: user[0].dataValues}
    }catch(error){
      return {status: 401, message: error.message}
    }
  }
}

export default UserController
