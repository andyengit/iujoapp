import { useRouter } from "next/router";
import styles from "./service.module.css";
import SearchModule from "../../components/SearchModule";
import CreatePostContainer from "../../components/CreatePostContainer"; 
import usePosts from "../../hooks/usePosts";
import useAuth from "../../hooks/useAuth";
import {useState , useEffect} from 'react';
import axios from 'axios';
import TextLoading from "../../components/TextLoading";

const Service = () => {
  
  const {getPosts, renderPosts, setDefaultParams} = usePosts();
  const { query: { servicePath }, push} = useRouter();
  const auth = useAuth();

  const [service, setService] = useState(false);
  const [postEnable,setPostEnable] = useState(false);

  useEffect(() => {
    if(servicePath !== undefined){
      axios.get(`/api/services?name=${servicePath}`)
        .then(({data}) => {
          setService(data.service)
          getPosts({serviceId: data.service.id})
          setDefaultParams({serviceId: data.service.id})
        })
        .catch(() => {
          push('/oops')
        })
    }
  }, [servicePath])

  useEffect(() => {
    if(auth.isLogged && auth.dataUser){
      const { UsersServices } = auth.dataUser;
      if(UsersServices.filter(({serviceId}) => serviceId === service.id).length > 0){
        setPostEnable(true);
      }
    }
  }, [auth,service])

  return (
    <div className={styles.grid}>
      <div className={styles.profile}>
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
            <p>Coordinador: {service.coordinator}</p> :
            <TextLoading />}
        </div>
      </div>
      <div className={styles.posts}>
        {postEnable && (
          <CreatePostContainer 
          mode="CREATE"
          getPosts={getPosts}
          service={{name: service.name, id: service.id}}/>
        )}
        {renderPosts()}   
      </div>
      <div>
        <SearchModule />
      </div>
    </div>
  );
};

export default Service;
