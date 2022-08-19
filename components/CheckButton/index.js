import styles from "./CheckButton.module.css";

const CheckButton = ({ title = "label", state = true, setState }) => {
  const handleClick = () => {
    if (!!setState) {
      setState(!state);
    }
  };

  const classByState = state
    ? styles.check + " " + styles.checked
    : styles.check;

  return (
    <div className={styles.checkBox}>
      <div type="button" onClick={handleClick} className={classByState}></div>
      <label className={styles.label}>{title}</label>
    </div>
  );
};

export default CheckButton;
