import styles from "./PrincipalPost.module.css";
import PostContainer from "../PostContainer";
import Link from "next/link";
import usePosts from "../../hooks/usePosts";
import {useEffect} from "react";

const PrincipalPost = () => {

  const {getPosts, posts } = usePosts();

  useEffect(() => {
    getPosts({limit: 2});
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.grid}>
        <div className={styles.posts}>
          {posts && posts.rows ? posts.rows.map((post) => (
            <PostContainer key={post.id} data={post} />
          )) : 
            <>
              <PostContainer/> 
              <PostContainer/>
            </>}
        </div>
        <Link href="/p">
          <a className={styles.more}>Ver Mas</a>
        </Link>
      </div>
    </div>
  );
};

export default PrincipalPost;
