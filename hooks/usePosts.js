import axios from 'axios'
import { useState } from 'react'
import PostContainer from "../components/PostContainer";
import useAuth from "../hooks/useAuth";
import useNotification from "../hooks/useNotification";

const usePosts = () => {

  const notification = useNotification();
  const [posts, setPosts] = useState([]);
  const [defaultParams, setDefaultParams] = useState({});
  const {token} = useAuth();
  const rows = posts.rows;
  const preview = [1,2,3];
  
  const getPosts = async (reqdata = {page : 0}) => {
    const data = {...reqdata, ...defaultParams};
    let url = '/api/posts?';
    if (data.page !== undefined) url+= `page=${data.page}`;
    if (data.limit !== undefined) url+= `&limit=${data.limit}`;
    if (data.userId !== undefined) url += `&user=${data.userId}`;
    if (data.serviceId !== undefined) url +=`&service=${data.serviceId}`;
    axios.get(url)
      .then(res => setPosts(res.data))
      .catch(err => {
        notification.setNotification(err.response.data.message)
      })
  }

  const config = {
    headers: {
      Authorization: `Bareer ${token}`,
      "content-type":
        "multipart/form-data; boundary=--------------------------999619143332017334035581",
    },
  };

  const updatePost = async (id, data, callback,catchCallback, fn) => {
    axios.put(`/api/posts/${id}`, data, config)
      .then((res) => {
        if (res.data.status === 201){
          callback && callback()
          notification.setNotification(res.data.message)
        } else {
          notification.setNotification(res.data.message, "ERROR")
        }
      })
      .catch(err => {
	      catchCallback && catchCallback()
        notification.setNotification(err.response.data.message)
      })
      .finally(() => {
        fn && fn()
      })
  }

  const deletePost = async (id, callback, catchCallback) => {
    axios.delete(`/api/posts/${id}`, {...config})
      .then((res) => {
        if (res.data.status === 201){
          callback && callback()
          notification.setNotification(res.data.message)
        } else {
          notification.setNotification(res.data.message, "ERROR")
        }
      })
      .catch(err => {
	      catchCallback && catchCallback()
        notification.setNotification(err.response.data.message, "ERROR")
      })
  }

  const createPost = async (post, callback , catchCallback, fn) => {
    const form = new FormData();
    form.append("file", post.image);
    form.append("title", post.title);
    form.append("content", post.content);
    form.append("tags", JSON.stringify(post.tags));
    axios.post('/api/posts', form, config)
      .then((res) => {
        if (res.data.status === 201){
          callback && callback()
          notification.setNotification(res.data.message)
        } else {
          notification.setNotification(res.data.message, "ERROR")
        }
      })
      .catch(err => {
	      catchCallback && catchCallback()
        notification.setNotification(err.response.data.message, "ERROR")
      })
      .finally(() => {
        fn && fn()
      })
  }

  const renderPosts = () => {
    if (rows) {
      if (rows.length > 0) {
	return rows.map((el,key) => <PostContainer key={key} data={el} deletePost={deletePost} getPosts={getPosts}/>)
      }
      return <h2>No hay publicaciones disponibles para la busqueda</h2> 
    } else {
      return preview.map((el,key) => <PostContainer key={key}/>)
    }
  }

  return {
    posts,
    getPosts,
    createPost,
    updatePost,
    renderPosts,
    setDefaultParams
  }
}

export default usePosts
