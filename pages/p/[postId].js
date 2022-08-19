import styles from "./Posts.module.css";
import PostContainer from "../../components/PostContainer";
import SearchModule from "../../components/SearchModule";

const Posts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftside}></div>
      <div className={styles.content}>
        <PostContainer />
      </div>
      <div className={styles.rightside}>
        <SearchModule />
      </div>
    </div>
  );
};

export default Posts;
