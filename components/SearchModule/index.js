import { useEffect, useState } from "react";
import TextLoading from "../TextLoading";
import styles from "./SearchModule.module.css";
import axios from "axios";
import { useRouter } from 'next/router';

const SearchModule = ({ getPosts, setDefaultParams, defaultParams }) => {

  const [input, setInput] = useState("");
  const [search, setSearch] = useState();
  const [popVisible, setPopVisible] = useState(false);
  const [autors, setAutors] = useState([]);
  const [tags, setTags] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getPosts();
    axios.get("/api/users/")
      .then(res => {
        setAutors(res.data.rows)
      })
    axios.get("/api/tags/")
      .then(res => {
        setTags(res.data.rows)
      })
  }, [search])


  const handleSearchTag = (input) => {
    setDefaultParams({ ...defaultParams, tags: input })
    getPosts({ ...defaultParams, tags: input })
  }

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

    return tags.map((el, i) => (<div onClick={() => handleSearchTag(el.name)} className={styles.tag} key={i}>
      <span>{el.name}</span>
      <div>{el.count}</div>
    </div>))
  }

  const handleChangeInput = (({ target }) => {
    setInput(target.value)
    if (target.value.length > 2) {
      setPopVisible(true)
    } else {
      setPopVisible(false)
    }
  })

  const handleFocus = () => {
    if (input.length > 2) {
      setPopVisible(true)
    }
  }

  const handleSearch = (e) => {
    if (e.key !== "Enter" && e.type !== "click") {
      return false;
    }

    if (input.length < 3 && input.length > 0) {
      return false;
    }

    if (input.startsWith("#")) {
      handleSearchTag(input.slice(1, input.length))
    } else {
      setDefaultParams({ ...defaultParams, search: input, tags: "" })
      setSearch({ ...defaultParams, search: input, tags: "" })
    }

  }


  const ShowAutors = () => {
    if (!autors || !popVisible) return false

    return (<ul className={styles.popSearch}>
      {input.startsWith('#') ?
        <li onClick={() => handleSearchTag(input)}>Buscar etiqueta: {input}</li>
        :
        <li onClick={handleSearch}>Buscar titulo o contenido: {input}</li>
      }
      {autors
        .filter((el) => {
          if (el.name.toLowerCase().startsWith(input.toLowerCase()) ||
            el.username.toLowerCase().startsWith(input.toLowerCase())) {
            return true
          }
          return false;
        })
        .map((el, i) => <li key={i} onClick={() => {
          router.push(`/u/${el.username}`)
          setInput("")
          setPopVisible(false)
        }}>
          <span>{el.name}</span>
          <span className={styles.username}>@{el.username}</span>
        </li>)
      }
    </ul >)
  }

  return (
    <div
      onFocus={handleFocus}
      className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.inputSearch}
          placeholder="Buscar..."
          onKeyUp={handleSearch}
          onChange={handleChangeInput}
        />
        <button onClick={handleSearch} className={styles.button}>Buscar</button>
        <ShowAutors />
      </div>
      <div
        className={styles.suggestions}>
        <ShowTags />
      </div>
    </div>
  );
};

export default SearchModule;
