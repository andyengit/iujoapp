import {verifyToken} from './handleToken';
import multer from "multer";
import path from "path";

export const handleApiError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  let error = { ...err };
  error.message = err.message;
  res.status(err.statusCode).json({
    error,
    message: error.message,
    stack: error.stack,
  });
};

export const onNoMethod = (req, res) => {
  res.status(405).end("Method not allowed");
};

export const notAuthorized = async (req, res, next) => {
  try{
    let token = req.headers.authorization
    token = await token.slice(7,token.length)
    const verify = await verifyToken(token)
    if (!verify){
      return res.status(401).json({message: "1: No tienes permisos para esta accion"});
    }
    if(req.body === ""){
      return res.status(401).json({message: "2: No tienes permisos para esta accion"});
    }
    const body = {...req.body, userId: verify.id}
    req.body = body
    next()
  }catch(error){
    return res.status(401).json({message: "3: No tienes permisos para esta accion"});
  }
}
