import { useRouter } from "next/router";
import { useState } from "react";
import UploadFile from "../../components/UploadFile";
import Input from "../../components/Input";
import styles from "./Setup.module.css";
import Button from "../../components/Button";
import axios from "axios"

const Setup = () => {
  const [password, setPassword] = useState();
  const [token, setToken] = useState('');
  const router = useRouter();
  const [enable, setEnable] = useState(false);
  const [message, setMesssage] = useState(false)
  const [isDb, setIsDb] = useState(false)
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [passwordAdmin, setPasswordAdmin] = useState();

  const getDB = () => {
    axios.get('api/users')
      .then(() => setIsDb(true))
  }

  const handleLogin = () => {
    axios.post('/api/auth/setup/', {
      password, user: {
        name,
        password: passwordAdmin,
        email,
      }
    })
      .then(({ data }) => {
        setToken(data.token)
        setEnable(true);
        setMesssage(false)
        getDB()
      })
      .catch(() => {
        setMesssage("Ha ingresado la clave de producto incorrecta, porfavor contacta con el soporte.")
      })
  };

  const RestoreDB = async () => {
    if (!enable) {
      setMesssage("Debe ingresar la clave de producto primero.")
      return
    }

    router.push(`/setup/success?token=${token}`)
  }


  return (
    <div className={styles.window}>
      <div className={styles.container}>
        {message && <p className={styles.message}>{message}</p>}
        <h1>Instalacion del produto</h1>
        <Input title="CLAVE DE PRODUCTO" type="password" onChange={setPassword} />
        <Button title="Verificar" onClick={handleLogin} />
        <div className={enable ? styles.show : styles.disable}>
          <Input title="Nombre Administrador" onChange={setName} />
          <Input title="Correo Administrador" onChange={setEmail} />
          <Input title="Contraseña Administrador" onChange={setPasswordAdmin} />
          <UploadFile name="Logo + text (png)" filename="logo.png" />
          <UploadFile name="Logo (png)" filename="logoplus.png" />
          <UploadFile name="Favicon (ico)" filename="favicon.ico" />
          <UploadFile name="Fondo (png)" filename="background.png" />
          <UploadFile name="Foto Mensaje (png)" filename="principal.png" />
          <Button onClick={RestoreDB} title={isDb ? "REINICIAR BASE DE DATOS" : "CREAR BASE DE DATOS"} />
        </div>
      </div>
    </div>
  );
};

export default Setup;
