import styles from "./PopUp.module.css";
import Button from "../Button";
import { Children } from "react";

const PopUp = ({ children, closePopUp, type = "SELECTION" , callback }) => {
  return (
      <div className={styles.popUp}>
	      <div className={styles.popUpContent}>
		      <button onClick={closePopUp} className={styles.closeButton}>
			      X
		      </button>
          {children}
		      {type === "SELECTION" && 
			(<>
			  <Button title="Cancelar" onClick={closePopUp} />
			  <Button title="Aceptar" onClick={() => {
			    closePopUp()
			    callback()
			  }} />
			</>)}
	      </div>
      </div>
);
};

export default PopUp;
