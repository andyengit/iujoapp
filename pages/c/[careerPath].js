import styles from "./Career.module.css";
import Button from "../../components/Button";

const Careers = () => {
  return (
    <>
      <div className={styles.top}>Carrera</div>
      <div className={styles.pensum}>
        <Button title="Descargar pensum" color="white" />
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <h3 className={styles.subtitle}>Descripcion</h3>
          <p className={styles.text}>Lorem ipsum </p>
        </div>
        <div className={styles.profile}>
          <h3 className={styles.subtitle}>Perfil del egresado</h3>
          <p className={styles.text}>
            tatatatatatata tata tatat attatata tatat atata atat
          </p>
        </div>
      </div>
    </>
  );
};

export default Careers;
