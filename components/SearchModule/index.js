import { useEffect, useState } from "react";
import usePosts from "../../hooks/usePosts";
import TextLoading from "../TextLoading";
import styles from "./SearchModule.module.css";

const SearchModule = ({getPosts, setDefaultParams, defaultParams}) => {

  const [input, setInput] = useState("");
  const [search, setSearch] = useState();

  const tags = false;
  const ShowTags = () => {
    if (!tags) {
      return (<>
        <TextLoading />
        <TextLoading />
        <TextLoading />
        <TextLoading />
        <TextLoading />
      </>)
    }
  }

  const handleSearch = (e) => {
    if (e.key !== "Enter" && e.type !== "click") {
      return false;
    }
    setDefaultParams({...defaultParams,search: input})
    setSearch({search: input})
  }

  useEffect(() => {
    getPosts();
  },[search])

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.inputSearch}
          placeholder="Buscar..."
          onKeyUp={handleSearch}
          onChange={({target})=> setInput(target.value)}
        />
        <button onClick={handleSearch} class={styles.button}>Buscar</button>
      </div>
      <div className={styles.suggestions}>
        <ShowTags/>
      </div>
    </div>
  );
};

export default SearchModule;
