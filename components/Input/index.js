import styles from "./Input.module.css";

const Input = ({
  title = "Titulo",
  description = "",
  color = "black",
  type = "text",
  only = "",
  defaultValue,
  disabled = false,
  onChange,
  value,
  valueMap = false
}) => {

  const event = (e) => {
    if (e.target.value === "") {
      onChange && onChange(e.target.value)
      return
    }
    if (only === "letter+") {
      if (/^[A-Za-z ]+$/.test(e.target.value)) onChange && onChange(e.target.value); // Match with regex 
      return
    }
    if (only === "letter") {
      if (/^[A-Za-z]+$/.test(e.target.value)) onChange && onChange(e.target.value); // Match with regex 
      return
    }
    onChange && onChange(e.target.value)
  }

  let newMap = [{ id: false, name: "" }]
  if (valueMap) {
    newMap = [...newMap, ...valueMap]
  }

  const className =
    color !== "black" ? styles.inputBox + " " + styles[color] : styles.inputBox;
  const descriptionRender = description !== "" ? "(" + description + ")." : "";

  if (type === 'selection') {
    return (
      <div className={className}>
        <label>{title}</label>
        <select
          className={styles.input}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={event}
          value={value}>
          {newMap && newMap.map((el, index) => <option key={index} value={el.id}>{el.name}</option>)}
        </select>
        <p>{descriptionRender}</p>
      </div>)
  }
  return (
    <div className={className}>
      <label>{title}</label>
      <input

        className={styles.input}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        type={type}
        onChange={event} />
      <p>{descriptionRender}</p>
    </div>
  );
};

export default Input;
