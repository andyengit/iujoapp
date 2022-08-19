import styles from "./Input.module.css";

const Input = ({
  title = "Titulo",
  description = "Descripcion",
  color = "black",
  type = "text",
}) => {
  const className =
    color !== "black" ? styles.inputBox + " " + styles[color] : styles.inputBox;
  const descriptionRender = description !== "" ? "(" + description + ")." : "";

  return (
    <div className={className}>
      <label>{title}</label>
      <input type={type} />
      <p>{descriptionRender}</p>
    </div>
  );
};

export default Input;
