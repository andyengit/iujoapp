import styles from "./PrincipalPost.module.css";
import PostContainer from "../PostContainer";
import Link from "next/link";
import usePosts from "../../hooks/usePosts";
import { useEffect } from "react";

const PrincipalPost = () => {

  const { getPosts, posts } = usePosts();

  useEffect(() => {
    getPosts({ limit: 2 });
  }, [])

  const RenderPosts = () => {
    if (!posts || !posts.rows) {
      return (<>
        <PostContainer />
        <PostContainer />
      </>)
    }

    if(posts.rows.length === 0){
      return <h2>No hay publicaciones disponibles</h2>
    }

    return (posts.rows.map((post) => (
      <PostContainer key={post.id} data={post} modeParam={true} />
    )))

  }

  return (
    <div className={styles.content}>
      <div className={styles.grid}>
        <div className={styles.posts}>
          <RenderPosts/>
        </div>
        <Link href="/p">
          <a className={styles.more}>Ver Mas</a>
        </Link>
      </div>
    </div>
  );
};

export default PrincipalPost;
