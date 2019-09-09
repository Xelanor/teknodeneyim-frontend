import axios from 'axios'

import { SET_SIDEBAR_POSTS } from './types'

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
