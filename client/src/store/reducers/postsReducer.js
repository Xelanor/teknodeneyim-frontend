import { SET_SIDEBAR_POSTS, SET_POST_COMMENTS, LIKE_COMMENT } from '../actions/types';

const initialState = {
  posts: null,
  post: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case SET_POST_COMMENTS:
      return {
        ...state,
        post: action.payload
      }
    case LIKE_COMMENT:
      let comments = state.post.post.comments
      Object.keys(comments).forEach(key => {
        if (comments[key]._id === action.payload.commentId) {
          comments[key].likes.includes(action.payload.userId) ? comments[key].likes.splice(comments[key].likes.indexOf(action.payload.userId), 1) : comments[key].likes.push(action.payload.userId)
        }
      })
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            comments
          }
        }
      }
    default:
      return state;
  }
}