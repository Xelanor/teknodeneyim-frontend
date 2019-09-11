import axios from 'axios'

import { LIKE_COMMENT } from './types'

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