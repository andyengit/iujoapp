import styles from "./dashboard.module.css";
import CreatePostContainer from "../../../components/CreatePostContainer";
import SearchModule from "../../../components/SearchModule";
import usePosts from "../../../hooks/usePosts";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Link from "next/link";
import { IoIosOptions } from "react-icons/io";
import { BiLogOut } from 'react-icons/bi'
const Dashboard = () => {

  const { getPosts, RenderPosts, setDefaultParams } = usePosts();
  const { dataUser } = useAuth();

  useEffect(() => {
    if (dataUser !== null) {
      getPosts({ userId: dataUser.id });
      setDefaultParams({ userId: dataUser.id });
    }
  }, [dataUser])

  if (!dataUser) {
    return
  }

  const renderProfile = (type) => {

    let styled = styles.profile;
    if (type === 2) styled = styles.profile2;

    return (
      <div className={styled}>
        <div className={styles.top}>
          <div className={styles.image}></div>
          <div className={styles.service}>
            <p>Bienvenido, {dataUser && dataUser.name} </p>
            <div className={styles.options}>
              <Link href="/a/settings">
                <a><IoIosOptions size="1.5rem" /></a>
              </Link>
              <Link href="/auth/logout">
                <a><BiLogOut size="1.5rem" /></a>
              </Link>
            </div>
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
        <RenderPosts wait={dataUser} />
      </div>
      <div className={styles.search}>
        <SearchModule getPosts={getPosts} setDefaultParams={setDefaultParams} defaultParams={setDefaultParams} />
      </div>
    </div>
  );
};

export default Dashboard;
