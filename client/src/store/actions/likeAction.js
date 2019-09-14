import axios from 'axios'

import { LIKE_COMMENT, SAVE_POST } from './types'

export const likeComment = (commentId, userId) => dispatch => {
  axios.post(`/comments/${commentId}/like`, { userId })
    .then(res => {
      if (res.status === 200) { dispatch(setLikeState(commentId, userId)) }
    })
    .catch(err => { console.log(err) })
}

export const setLikeState = (commentId, userId) => {
  return {
    type: LIKE_COMMENT,
    payload: { commentId, userId }
  }
}

export const savePost = (postId, userId) => dispatch => {
  axios.post(`/posts/${postId}/save`, { userId })
    .then(res => {
      if (res.status === 200) {
        dispatch(setSaveState(postId, userId))
        axios.post(`/users/user-save-post`, { userId, postId })
          .then(res => { })
          .catch(err => { console.log(err) })
      }
    })
    .catch(err => { console.log(err) })
}

export const setSaveState = (postId, userId) => {
  return {
    type: SAVE_POST,
    payload: { postId, userId }
  }
}