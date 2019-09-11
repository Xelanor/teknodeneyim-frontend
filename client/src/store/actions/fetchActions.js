import axios from 'axios'

import { SET_SIDEBAR_POSTS, SET_POST_COMMENTS, COMMENT_PER_PAGE, CREATE_POST } from './types'

export const createPost = (post) => dispatch => {
  axios.post('/posts/add', post)
    .then(res => console.log(res))
    .catch((error) => { console.log(error); })
}

export const fetchPosts = () => dispatch => {
  axios.get('/posts/homepage')
    .then(res => { dispatch(setSidebarPosts(res.data)) })
    .catch(err => { console.log(err) })
}

export const setSidebarPosts = data => {
  return {
    type: SET_SIDEBAR_POSTS,
    payload: data
  }
}

export const fetchComments = (postId) => dispatch => {
  axios.get(`/posts/${postId}`)
    .then(res => { dispatch(setPostComments(res.data)) })
    .catch(err => { console.log(err) })
}

export const setPostComments = (post) => {
  return {
    type: SET_POST_COMMENTS,
    payload: {
      post: post,
      pageCount: Math.ceil(post.comments.length / COMMENT_PER_PAGE)
    }
  }
}