import styles from "./dashboard.module.css";
import CreatePostContainer from "../../../components/CreatePostContainer";
import SearchModule from "../../../components/SearchModule";
import usePosts from "../../../hooks/usePosts";
import {useEffect} from "react";

const Dashboard = () => {

  const {getPosts, renderPosts} = usePosts();
  
  useEffect(() => {
    getPosts();
  }, [])

  const renderProfile = (type) => {
  
    let styled = styles.profile;
    if (type === 2) styled = styles.profile2;

    return (
      <div className={styled}>
        <div className={styles.top}>
          <div className={styles.image}></div>
          <div className={styles.service}>
            <p>Bienvenido, IUJO</p>
          </div>
        </div>
        <div className={styles.data}>
          <p>description</p>
        </div>
      </div>)
  }

  return (
    <div className={styles.grid}>
      {renderProfile(1)}
      <div className={styles.posts}>
	{renderProfile(2)}
        <CreatePostContainer getPosts={getPosts} />
	{renderPosts()}
      </div>
      <div className={styles.search}>
        <SearchModule />
      </div>
    </div>
  );
};

export default Dashboard;
