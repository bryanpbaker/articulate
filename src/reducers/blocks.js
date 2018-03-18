import { FETCH_BLOCKS } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case FETCH_BLOCKS:
      return action.payload;
  }
}