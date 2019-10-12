import { SET_SIDEBAR_POSTS, SET_HOMEPAGE_POSTS, SET_POST_COMMENTS, LIKE_COMMENT, SAVE_POST, LIKE_HOMEPAGE_COMMENT } from '../actions/types';

const initialState = {
  posts: null,
  sidebarposts: null,
  post: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_HOMEPAGE_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case SET_SIDEBAR_POSTS:
      return {
        ...state,
        sidebarposts: action.payload
      }
    case SET_POST_COMMENTS:
      return {
        ...state,
        post: action.payload
      }
    case LIKE_COMMENT:
      let comments = [...state.post.post.comments]
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
    case LIKE_HOMEPAGE_COMMENT:
      let state_posts = [...state.posts]
      state_posts.map(post => {
        post.comments.map(comment => {
          if (comment._id === action.payload.commentId) {
            comment.likes.includes(action.payload.userId) ? comment.likes.splice(comment.likes.indexOf(action.payload.userId), 1) : comment.likes.push(action.payload.userId)
          }
        })
      })
      return {
        ...state,
        posts: state_posts
      }
    case SAVE_POST:
      let saved = [...state.post.post.saved]
      saved.includes(action.payload.userId) ? saved.splice(saved.indexOf(action.payload.userId), 1) : saved.push(action.payload.userId)
      return {
        ...state,
        post: {
          ...state.post,
          post: {
            ...state.post.post,
            saved
          }
        }
      }
    default:
      return state;
  }
}