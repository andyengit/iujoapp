import SettingsLinks from "../../../components/SettingsLinks";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.container}>
      <SettingsLinks />
      <div className={styles.dashboard}>Analisis</div>
    </div>
  );
};

export default Settings;
