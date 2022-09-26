import {verifyToken} from './handleToken';

export const handleApiError = {
  onError: (err, req, res, next) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is notssssssss found");
  },
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
      console.log("SIN AUTORIZACION")
      return res.status(401).end("No tienes permisos para esta accion");
    }
    if(req.body !== ""){
      let filter = JSON.parse(req.body)
      let body = {...filter, userId: verify.id}
      req.body = JSON.stringify(body)
    }
    next()
  }catch(error){
    console.log("AQIO")
    return res.status(401).end("No tienes permisos para esta accion");
  }
}
