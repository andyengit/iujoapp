import styles from "./Posts.module.css";
import SearchModule from "../../components/SearchModule";
import usePosts from "../../hooks/usePosts";
import { useEffect } from "react"

const Posts = () => {

  const { getPosts, setDefaultParams, RenderPosts } = usePosts();

  useEffect(() => {
    getPosts();
    setDefaultParams({ page: 0})
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.leftside}></div>
      <div className={styles.content}>
        <RenderPosts />
      </div>
      <div className={styles.rightside}>
        <SearchModule getPosts={getPosts} setDefaultParams={setDefaultParams}/>
      </div>
    </div>
  );
};

export default Posts;
