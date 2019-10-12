import axios from 'axios'

import { LIKE_COMMENT, LIKE_HOMEPAGE_COMMENT, SAVE_POST } from './types'

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

export const likeHomepageComment = (commentId, userId) => dispatch => {
  axios.post(`/comments/${commentId}/like`, { userId })
    .then(res => {
      if (res.status === 200) { dispatch(setHomepageLikeState(commentId, userId)) }
    })
    .catch(err => { console.log(err) })
}

export const setHomepageLikeState = (commentId, userId) => {
  return {
    type: LIKE_HOMEPAGE_COMMENT,
    payload: { commentId, userId }
  }
}

export const savePost = (postId, userId) => async dispatch => {
  await axios.post(`/posts/${postId}/save`, { userId })
    .then(async res => {
      if (res.status === 200) {
        await axios.post(`/users/user-save-post`, { userId, postId })
          .then(res => { dispatch(setSaveState(postId, userId)) })
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