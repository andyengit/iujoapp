import styles from "./user.module.css";
import PostContainer from "../../components/PostContainer";
import SearchModule from "../../components/SearchModule";

const Username = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.profile}>
        <div className={styles.top}>
          <div className={styles.image}></div>
          <div className={styles.service}>
            <p>IUJO</p>
            <span>@IUJO</span>
          </div>
        </div>
        <div className={styles.data}>
          <p>description</p>
          <p>iujo@iujo.com.ve</p>
        </div>
      </div>
      <div className={styles.posts}>
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </div>
      <div>
        <SearchModule />
      </div>
    </div>
  );
};

export default Username;
