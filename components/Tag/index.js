import styles from "./Tag.module.css";

const Tag = ({ name = "" }) => {
  const className = name === "" ? styles.none : styles.tag;

  return <div className={className}>{name}</div>;
};

export default Tag;
