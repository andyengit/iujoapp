import styles from "./dashboard.module.css";
import PostContainer from "../../../components/PostContainer";
import CreatePostContainer from "../../../components/CreatePostContainer";
import SearchModule from "../../../components/SearchModule";

const Dashboard = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.profile}>
        <div className={styles.top}>
          <div className={styles.image}></div>
          <div className={styles.service}>
            <p>Bienvenido, IUJO</p>
          </div>
        </div>
        <div className={styles.data}>
          <p>description</p>
        </div>
      </div>
      <div className={styles.posts}>
        <CreatePostContainer />
        <PostContainer />
      </div>
      <div>
        <SearchModule />
      </div>
    </div>
  );
};

export default Dashboard;
