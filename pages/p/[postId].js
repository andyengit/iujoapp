import styles from "./Posts.module.css";
import SearchModule from "../../components/SearchModule";
import usePosts from "../../hooks/usePosts";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Posts = () => {
  const router = useRouter();
  const { getPost, getPosts, RenderPosts, setDefaultParams, defaultParams } = usePosts();

  useEffect(() => {
    if (router.query.postId !== undefined) {
      getPost(router.query.postId);
    }
  }, [router])

  return (
    <div className={styles.container}>
      <div className={styles.leftside}></div>
      <div className={styles.content}>
        <RenderPosts one={true} />
      </div>
      <div className={styles.rightside}>
        <SearchModule getPosts={() => getPost(router.query.postId)} setDefaultParams={setDefaultParams} defaultParams={defaultParams} />
      </div>
    </div>
  );
};

export default Posts;
