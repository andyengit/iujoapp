import styles from "./Posts.module.css";
import SearchModule from "../../components/SearchModule";
import usePosts from "../../hooks/usePosts";
import { useEffect } from "react"

const Posts = () => {
  
  const { getPosts, renderPosts } = usePosts();

  useEffect(()=> {
    getPosts();
  }, [])
  
  return (
    <div className={styles.container}>
      <div className={styles.leftside}></div>
      <div className={styles.content}>
        {renderPosts()}
      </div>
      <div className={styles.rightside}>
        <SearchModule />
      </div>
    </div>
  );
};

export default Posts;
