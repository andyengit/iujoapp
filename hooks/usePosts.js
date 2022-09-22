import axios from 'axios'
import { useState } from 'react'
import PostContainer from "../components/PostContainer";

const usePosts = () => {

  const [posts, setPosts] = useState([])
  const rows = posts.rows
  const preview = [1,2,3]
  
  const getPosts = async () => {
    axios.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => {
	console.log(err);
      })
  }

  const updatePost = async (id, data, callback,catchCallback) => {
    axios.put(`/api/posts/${id}`, data)
      .then(() => {
        callback && callback()
      })
      .catch(err => {
	      catchCallback && catchCallback() 
      })
  }

  const deletePost = async (id, callback, catchCallback) => {
    axios.delete(`/api/posts/${id}`)
      .then(() => {
        callback && callback()
      })
      .catch(() => {
        catchCallback && catchCallback()
      })
  }

  const createPost = async (post, callback , catchCallback) => {
    axios.post('/api/posts', post)
      .then(() => {
	callback &&  callback()
      }).catch(() => {
	catchCallback && catchCallback()
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
  }
}

export default usePosts
