import SettingsLinks from "../../../components/SettingsLinks";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.dashboard}>
        <h3>Bienvenidos a las configuraciones de la App</h3>
        <p>En la seccion <strong>Cuenta</strong>, podras editar tus datos, como el nombre y tu contraseña.</p>
      </div>
    </div>
  );
};

export default Settings;
