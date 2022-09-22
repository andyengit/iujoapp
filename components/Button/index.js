import styles from "./Button.module.css";

const Button = ({ title, path = "", onClick, color = "black", state = true }) => {
  const CustomColor = () => {
    let colors = "";

    if (color === "white") {
      colors = styles.button + " " + styles.white;
    } else if (color === "red") {
      colors = styles.button + " " + styles.red;
    } else if (color === "green") {
      colors = styles.button + " " + styles.green;
    } else if (color === "orange") {
      colors = styles.button + "  " + styles.orange;
    } else {
      colors = styles.button;
    }
    if (!state){
      colors = colors + " " + styles.disabled;
    }
    return colors;
  };

  return (
    <button onClick={onClick} className={CustomColor()}>
      {title}
    </button>
  );
};

export default Button;
