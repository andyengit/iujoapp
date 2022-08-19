import styles from "./PrincipalPost.module.css";
import PostContainer from "../PostContainer";
import Link from "next/link";

const PrincipalPost = () => {
  return (
    <div className={styles.content}>
      <div className={styles.grid}>
        <div className={styles.posts}>
          <PostContainer />
          <PostContainer />
        </div>
        <Link href="/p">
          <a className={styles.more}>Ver Mas</a>
        </Link>
      </div>
    </div>
  );
};

export default PrincipalPost;
