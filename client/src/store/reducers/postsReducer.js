import { SET_SIDEBAR_POSTS } from '../actions/types';

const initialState = {
  posts: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    default:
      return state;
  }
}