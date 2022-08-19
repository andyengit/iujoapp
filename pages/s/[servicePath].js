import { useRouter } from "next/router";
import styles from "./service.module.css";
import PostContainer from "../../components/PostContainer";
import SearchModule from "../../components/SearchModule";

const Service = () => {
  const {
    query: { servicePath },
  } = useRouter();

  return (
    <div className={styles.grid}>
      <div className={styles.profile}>
        <div className={styles.top}>
          <div className={styles.image}></div>
          <div className={styles.service}>
            <p>UPP</p>
          </div>
        </div>
        <div className={styles.data}>
          <p>description</p>
          <p>04125119913</p>
          <p>Coordinador:</p>
          <p>Horario: </p>
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

export default Service;
