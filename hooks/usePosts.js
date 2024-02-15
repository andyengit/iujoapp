import axios from 'axios'
import styles from "../components/PostContainer/PostContainer.module.css";
import { useEffect, useState, useCallback } from 'react'
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
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
    setPosts([])
    setRows([])
  }, [])

  const getPosts = useCallback(async (reqdata = { page: 0 }) => {
    if (reqdata.page === 0 || !reqdata.page) {
      setRows(null);
    }
    const data = { ...defaultParams, ...reqdata };
    let url = '/api/posts?';
    if (data.page !== undefined && data.page !== "") url += `page=${data.page}`;
    if (data.search !== undefined && data.search !== "") url += `&search=${data.search}`;
    if (data.limit !== undefined && data.limit !== "") url += `&limit=${data.limit}`;
    if (data.userId !== undefined && data.userId !== "") url += `&user=${data.userId}`;
    if (data.serviceId !== undefined && data.serviceId !== "") url += `&service=${data.serviceId}`;
    if (data.tags !== undefined && data.tags !== "") url += `&tags=${data.tags}`;
    axios.get(url)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        notification.setNotification(err.response.message)
      })
  }, [defaultParams, notification])

  const getPost = (id) => {
    const url = `/api/posts/${id}`
    axios.get(url)
      .then(({ data }) => {
        setRows([data.post])
      })
      .catch(err => {
        notification.setNotification(err.response.message)
      })
  }

  const showMorePosts = () => {
    setPage(page + 1)
    getPosts({ page: page + 1 })
  }

  useEffect(() => {
    if (posts !== []) {
      if (page === 0) {
        setRows(posts.rows)
      } else {
        if (rows) {
          setRows([...rows, ...posts.rows])
        } else {
          setRows(posts.rows)
        }
      }
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
    data.image && form.append("file", data.image)
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

  const RenderPosts = ({ wait = true, one = false }) => {

    if (rows && wait) {
      if (rows.length > 0) {
        return (<>
          {rows.map((el, key) => (
            <PostContainer
              key={key}
              data={el}
              deletePost={deletePost}
              getPosts={getPosts}
            />))}
          {posts && rows && posts.count - rows.length > 1 && <div class={styles.showMorePosts} onClick={showMorePosts}>Ver mas</div>}
        </>)
      }
      return <h2>No hay publicaciones disponibles</h2>
    } else {
      return one ? <PostContainer /> :
        preview.map((el) => <PostContainer key={el} />)
    }
  }

  return {
    posts,
    getPosts,
    getPost,
    createPost,
    updatePost,
    RenderPosts,
    defaultParams,
    setDefaultParams
  }
}

export default usePosts
