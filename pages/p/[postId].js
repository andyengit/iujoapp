import styles from "./Posts.module.css";
import SearchModule from "../../components/SearchModule";
import usePosts from "../../hooks/usePosts";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Posts = () => {
  const router = useRouter();
  const { getPosts, RenderPosts } = usePosts();

  useEffect(()=> {
    getPosts();
  }, [])
  
  return (
    <div className={styles.container}>
      <div className={styles.leftside}></div>
      <div className={styles.content}>
        <RenderPosts/>
      </div>
      <div className={styles.rightside}>
        <SearchModule />
      </div>
    </div>
  );
};

export default Posts;
