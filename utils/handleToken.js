import { SignJWT, jwtVerify } from 'jose'

export const createToken = async (payload) => {
    try{
      const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(new Uint8Array(process.env.JWT_SECRET))
      return await jwt
    }catch(error){
      return false
    }
}

export const verifyToken = async (token) => {
  try{
    const { payload } = await jwtVerify(token, new Uint8Array(process.env.JWT_SECRET));
    return await payload;
  }catch(error){
    return false;
  }
}
