import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import axios from "axios";
import useNotification from "../hooks/useNotification";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const token = Cookies.get('sessionJWT');
  const [sessionJWT, setSessionJWT] = useState(token || null);
  const [dataUser, setDataUser] = useState(null);
  const { setNotification } = useNotification();

  useEffect(() => {
    if (token && !dataUser) {
      axios.get(`/api/auth/login?token=${sessionJWT}`)
        .then((res) => {
          setDataUser(res.data.user)
        })
        .catch(() => logOut())
    }
  }, [token, dataUser])

  const test = () => {
    setDataUser(null)
  }

  const logIn = (data) => {
    axios.post('/api/auth/login', data)
      .then(res => {
        setNotification("Inicio de Session exitoso!", "MESSAGE")
        Cookies.set('sessionJWT', res.data.token)
        setDataUser(res.data.user)
        setSessionJWT(res.data.token)
        router.reload();
      }).catch(err => {
        setNotification(err.response.data.message, "ERROR")
      })
  }

  const logOut = () => {
    setSessionJWT(null);
    setDataUser(null);
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
    token,
    test
  };

  return (<AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>)
}


export default AuthProvider;
