import {createContext, useState, useEffect} from "react"
import {useRouter} from "next/router";
import Cookies from 'js-cookie'
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const router = useRouter();
  const token = Cookies.get('sessionJWT');
  const [sessionJWT, setSessionJWT] = useState(token || null);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() =>{
    if(token && !dataUser){
      axios.get(`/api/auth/login?token=${sessionJWT}`)
        .then((res) => {
          console.log(res.data)
          setDataUser(res.data.user)})
        .catch(() => logOut())
    }
  }, [token,dataUser])

  const test = () => {
    setDataUser(null)
  }

  const logIn = (data) => {
    axios.post('/api/auth/login', data)
      .then(res => { 
        console.log(res.data)
        setSessionJWT(res.data.token);
        Cookies.set('sessionJWT', res.data.token)
        setDataUser(res.data.user);
      }).catch(err => {
        console.log(err.response)
      })
  }

  const logOut = () => {
    setSessionJWT(null);
    Cookies.remove('sessionJWT');
    router.push('/');
  }

  const isLogged = sessionJWT != null ? true : false;
  const contextValue = {
    sessionJWT,
    logIn,
    logOut,
    isLogged,
    dataUser,
    test
  };

  return (<AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>)
}


export default AuthProvider;
