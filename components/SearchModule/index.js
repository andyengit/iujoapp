import TextLoading from "../TextLoading";
import styles from "./SearchModule.module.css";

const SearchModule = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.inputSearch}
          placeholder="Buscar..."
        />
      </div>
      <div className={styles.suggestions}>
        <TextLoading />
        <TextLoading />
        <TextLoading />
        <TextLoading />
        <TextLoading />
      </div>
    </div>
  );
};

export default SearchModule;
