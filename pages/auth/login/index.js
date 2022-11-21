import styles from "./login.module.css";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth.js";
import { useState } from 'react'

const Login = () => {

  const { logIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Input
          title="Nombre de usuario"
          description=""
          color="white"
          onChange={setUsername}
          value={username}
        />
        <Input
          title="Contrasena"
          description=""
          color="white"
          type="password"
          onChange={setPassword}
          value={password}
        />
        <Button color="white" title="Iniciar sesion" onClick={() => logIn({ username, password })} />
      </div>
    </div>
  );
};

export default Login;
