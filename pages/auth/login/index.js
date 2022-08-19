import styles from "./login.module.css";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Image from "next/image";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.image}>
          <Image
            src="/img/controlestudio.jpg"
            layout={"fill"}
            priority
            objectFit="cover"
            alt={"Personal Iujo"}
          />
        </div>
        <div className={styles.form}>
          <Input title="Nombre de usuario" description="" color="white" />
          <Input
            title="Contrasena"
            description=""
            color="white"
            type="password"
          />
          <Button color="white" title="Iniciar sesion" />
        </div>
      </div>
    </div>
  );
};

export default Login;
