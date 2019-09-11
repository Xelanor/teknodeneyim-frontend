import { LIKE_COMMENT } from '../actions/types';

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIKE_COMMENT:
      console.log(action.payload)
      return {
        ...state,
      }
    default:
      return state;
  }
}