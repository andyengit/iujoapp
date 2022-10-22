import styles from "./user.module.css";
import PostContainer from "../../components/PostContainer";
import SearchModule from "../../components/SearchModule";
import usePosts from "../../hooks/usePosts";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios'

const Username = () => {
  const { getPosts, RenderPosts, setDefaultParams } = usePosts();
  const { query: { usernamePath }, push } = useRouter();

  const [user, setUser] = useState(false);

  useEffect(() => {
    if (usernamePath !== undefined) {
      axios.get(`/api/users?name=${usernamePath}`)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(() => {
          push('/oops')
        })
    }
  }, [usernamePath])

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
        <RenderPosts />
      </div>
      <div>
        <SearchModule getPosts={getPosts} setDefaultParams={setDefaultParams} />
      </div>
    </div>
  );
};

export default Username;
