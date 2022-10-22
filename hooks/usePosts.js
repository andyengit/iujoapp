import axios from 'axios'
import { useEffect, useState } from 'react'
import PostContainer from "../components/PostContainer";
import useAuth from "../hooks/useAuth";
import useNotification from "../hooks/useNotification";

const usePosts = () => {

  const notification = useNotification();
  const [posts, setPosts] = useState([]);
  const [defaultParams, setDefaultParams] = useState({});
  const { token } = useAuth();
  const [rows, setRows] = useState(false);
  const preview = [1, 2, 3];

  useEffect(() => {
    setPosts([])
    setRows([])
  }, [])

  const getPosts = async (reqdata = { page: 0 }) => {
    setRows(null);
    const data = { ...reqdata, ...defaultParams };
    let url = '/api/posts?';
    if (data.page !== undefined) url += `page=${data.page}`;
    if (data.search !== undefined) url += `&search=${data.search}`;
    if (data.limit !== undefined) url += `&limit=${data.limit}`;
    if (data.userId !== undefined) url += `&user=${data.userId}`;
    if (data.serviceId !== undefined) url += `&service=${data.serviceId}`;
    axios.get(url)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        notification.setNotification(err.response.data.message)
      })
  }

  useEffect(() => {
    if(posts !== []){
      setRows(posts.rows)
    }
  }, [posts])

  const config = {
    headers: {
      Authorization: `Bareer ${token}`,
      'content-type': 'multipart/form-data'
    },
    onUploadProgress: (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    },
  };

  const updatePost = async (id, data, callback, catchCallback, fn) => {
    const form = new FormData();
    data.title && form.append("title", data.title);
    data.content && form.append("content", data.content);
    data.deleteTags && form.append("deleteTags", JSON.stringify(data.deleteTags));
    data.tags && form.append("tags", JSON.stringify(await data.tags.filter(el => {
      if (el.id === undefined) {
        return true
      }
      return false
    })));
    axios.put(`/api/posts/${id}`, form, config)
      .then((res) => {
        if (res.status === 201) {
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

  const deletePost = async (id, callback, catchCallback) => {
    axios.delete(`/api/posts/${id}`, { ...config })
      .then((res) => {
        if (res.status === 201) {
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

  const createPost = async (post, callback, catchCallback, fn) => {
    const form = new FormData();
    form.append("file", post.image);
    form.append("title", post.title);
    form.append("content", post.content);
    form.append("serviceId", post.serviceId);
    form.append("tags", JSON.stringify(post.tags))
    axios.post('/api/posts', form, config)
      .then((res) => {
        if (res.status === 201) {
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

  const RenderPosts = ({wait = true}) => {
    
    if (rows && wait) {
      if (rows.length > 0) {
        return rows.map((el, key) => (
          <PostContainer
            key={key}
            data={el}
            deletePost={deletePost}
            getPosts={getPosts}
          />))
      }
      return <h2>No hay publicaciones disponibles</h2>
    } else {
      return preview.map((el, key) => <PostContainer key={key} />)
    }
  }

  return {
    posts,
    getPosts,
    createPost,
    updatePost,
    RenderPosts,
    defaultParams,
    setDefaultParams
  }
}

export default usePosts
