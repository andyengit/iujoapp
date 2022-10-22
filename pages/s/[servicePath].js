import { useRouter } from "next/router";
import styles from "./service.module.css";
import SearchModule from "../../components/SearchModule";
import CreatePostContainer from "../../components/CreatePostContainer";
import usePosts from "../../hooks/usePosts";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
import TextLoading from "../../components/TextLoading";

const Service = () => {

  const { getPosts, RenderPosts, defaultParams,setDefaultParams } = usePosts();
  const { query: { servicePath }, push } = useRouter();
  const auth = useAuth();

  const [service, setService] = useState(false);
  const [postEnable, setPostEnable] = useState(false);

  useEffect(() => {
    if (servicePath !== undefined) {
      axios.get(`/api/services?name=${servicePath}`)
        .then(({ data }) => {
          setService(data.service)
          getPosts({ serviceId: data.service.id })
          setDefaultParams({ serviceId: data.service.id })
        })
        .catch(() => {
          push('/oops')
        })
    }
  }, [servicePath])

  useEffect(() => {
    if (auth.isLogged && auth.dataUser) {
      const { UsersServices } = auth.dataUser;
      if (UsersServices.filter(({ serviceId }) => serviceId === service.id).length > 0) {
        setPostEnable(true);
      }
    }
  }, [auth, service])

  const ShowProfile = ({ mode }) => {
    return (
      <div className={mode ?
        styles.profile :
        styles.profile + " " + styles.profile2}>
        <div className={styles.top}>
          <div className={styles.image}></div>
          <div className={styles.service}>
            {service ?
              <p>{service.name}</p> :
              <TextLoading />}
          </div>
        </div>
        <div className={styles.data}>
          {service ?
            <p>{service.description}</p> :
            <TextLoading />}
          {service ?
            <p>Tlf: {service.phone}</p> :
            <TextLoading />}
          {service ?
            (<Link href={`/u/${service.UsersServices[0].services.username}`}>
              <a>Coordinador: {service.UsersServices[0].services.name}</a>
            </Link>) :
            <TextLoading />}
        </div>
      </div>
    )
  }


  return (
    <div className={styles.grid}>
      <ShowProfile mode={true} />
      <div className={styles.posts}>
        <ShowProfile />
        {postEnable && (
          <CreatePostContainer
            mode="CREATE"
            getPosts={getPosts}
            service={{ name: service.name, id: service.id }} />
        )}
        <RenderPosts wait={service} />
      </div>
      <div class={styles.search}>
        <SearchModule
          getPosts={getPosts}
          setDefaultParams={setDefaultParams}
          defaultParams={defaultParams} />
      </div>
    </div>
  );
};

export default Service;
