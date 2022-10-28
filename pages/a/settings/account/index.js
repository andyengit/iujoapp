import SettingsLinks from "../../../../components/SettingsLinks";
import styles from "../Settings.module.css";
import Input from "../../../../components/Input";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button";

const Account = () => {

  const { dataUser } = useAuth();

  if (!dataUser) {
    return true
  }

  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.content}>
        <h3>Cuenta</h3>
        <div className={styles.twoFields}>
          <Input title={"Nombre"} defaultValue={dataUser.name} />
          <Input title={"Correo"} defaultValue={dataUser.email} disabled={true} />
        </div>
        <Input title={"Nombre de usuario"} defaultValue={dataUser.username} disabled={true} />
        <div className={styles.twoFields}>
          <Input title={"Contraseña nueva"} type={"password"}/>
          <Input title={"Repetir contraseña"} type={"password"}/>
        </div>
        <Button title="Guardar Cambios" color="green"/>
      </div>
    </div>
  );
};

export default Account;
