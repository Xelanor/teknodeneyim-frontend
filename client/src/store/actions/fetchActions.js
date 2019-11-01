import axios from 'axios'

import { SET_SIDEBAR_POSTS, SET_HOMEPAGE_POSTS, SET_POST_COMMENTS, COMMENT_PER_PAGE } from './types'

export const changeUserDescription = (userId, description) => async dispatch => {
  await axios.post('/users/change-description', { userId, description })
    .then(res => console.log(res))
    .catch((error) => { console.log(error); })
}

export const submitComment = (comment) => async dispatch => {
  await axios.post('/comments/add', comment)
    .then(res => dispatch(addCommentToPost({ id: comment.target, comment: res.data })))
    .catch((error) => { console.log(error); })
}

export const addCommentToPost = (commentToPost) => async dispatch => {
  await axios.post('/posts/add-comment-to-post', commentToPost)
    .then(res => console.log(res))
    .catch((error) => { console.log(error); })
}

export const createPost = (post) => dispatch => {
  axios.post('/posts/add', post)
    .then(res => console.log(res))
    .catch((error) => { console.log(error); })
}

export const fetchHomePosts = () => dispatch => {
  axios.get('/posts/homepage')
    .then(res => { dispatch(setHomePosts(res.data)) })
    .catch(err => { console.log(err) })
}

export const setHomePosts = data => {
  return {
    type: SET_HOMEPAGE_POSTS,
    payload: data
  }
}

export const fetchSidePosts = () => dispatch => {
  axios.get('/posts/sidebar-posts')
    .then(res => { dispatch(setSidebarPosts(res.data)) })
    .catch(err => { console.log(err) })
}

export const setSidebarPosts = data => {
  return {
    type: SET_SIDEBAR_POSTS,
    payload: data
  }
}

export const fetchComments = (slug) => dispatch => {
  axios.get(`/posts/${slug}`)
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