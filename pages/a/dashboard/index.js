import styles from "./dashboard.module.css";
import CreatePostContainer from "../../../components/CreatePostContainer";
import SearchModule from "../../../components/SearchModule";
import usePosts from "../../../hooks/usePosts";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Link from "next/link";
import { IoIosOptions } from "react-icons/io";
import { BiLogOut } from 'react-icons/bi'
import Image from "next/image";
const Dashboard = () => {

  const { getPosts, RenderPosts, setDefaultParams, defaultParams } = usePosts();
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
          <div className={styles.autorImage}>
            <Image src={'/base/background.png'} layout="fill" objectFit="cover" priority alt={'background'} />
          </div>
          <div className={styles.service}>
            <p>Bienvenido, {dataUser && dataUser.name} </p>
            <div className={styles.options}>
              <Link href="/a/settings">
                <a><IoIosOptions size="2rem" color="#212121" /></a>
              </Link>
              <Link href="/auth/logout">
                <a><BiLogOut size="2rem" color="#212121" /></a>
              </Link>
            </div>
          </div>
          <p>Servicios asociados:</p>
          {dataUser.UsersServices.map((el, i) => <Link key={i} href={`/s/${el.users.path}`}><a>{el.users.name}</a></Link>)}
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
        <SearchModule getPosts={getPosts} setDefaultParams={setDefaultParams} defaultParams={defaultParams} />
      </div>
    </div>
  );
};

export default Dashboard;
