import styles from "./user.module.css";
import Image from "next/image"
import SearchModule from "../../components/SearchModule";
import usePosts from "../../hooks/usePosts";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios'
import TextLoading from '../../components/TextLoading';
import Link from "next/link"

const Username = () => {
  const { getPosts, RenderPosts, setDefaultParams, defaultParams } = usePosts();
  const { query: { usernamePath }, push } = useRouter();
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (usernamePath !== undefined) {
      axios.get(`/api/users/${usernamePath}`)
        .then(({ data }) => {
          setUser(data)
          getPosts({ userId: data.id })
          setDefaultParams({ userId: data.id })
        })
        .catch(() => {
          push('/oops')
        })
    }
  }, [usernamePath])

  const ShowProfile = ({ mode }) => {
    return (<div className={styles.profile}>
      <div className={styles.top}>
        {user && user.image ? <div className={styles.autorImage}>
          <Image src={user.image} layout="fill" objectFit="cover" priority alt={user.name} />
        </div> :
          <div className={styles.image}></div>
        }
        <div className={styles.service}>
          {user ?
            <>
              <p>{user.name}</p>
              <span>@{user.username}</span>
            </>
            :
            <>
              <TextLoading /><TextLoading />
            </>}
        </div>
      </div>
      <div className={styles.data}>
        {user ?
          <>
            <p>Email:</p>
            <p>{user.email}</p>
            <p>Pertenece a:</p>
            {user.UsersServices.map((el, i) => <p key={i}><Link href={`/s/${el.users.path}`}><a>{el.users.name}</a></Link></p>)}
          </>
          :
          <>
            <TextLoading /><TextLoading />
          </>}
      </div>
    </div>)
  }

  return (
    <div className={styles.grid}>
      <div className={styles.leftside}>
        <ShowProfile />
      </div>
      <div className={styles.posts}>
        <div className={styles.toppos}>
          <ShowProfile />
        </div>
        <div className={styles.searchTop}>

          <SearchModule getPosts={getPosts} defaultParams={defaultParams} setDefaultParams={setDefaultParams} />
        </div>
        <RenderPosts wait={user} />
      </div>
      <div className={styles.rightside}>
        <SearchModule getPosts={getPosts} defaultParams={defaultParams} setDefaultParams={setDefaultParams} />
      </div>
    </div>
  );
};

export default Username;
