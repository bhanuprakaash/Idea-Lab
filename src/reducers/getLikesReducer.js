import { GET_LIKES } from '../actions/actionType.js';
const initState = {
  likes: [],
  loading: false,
};
const getlikesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIKES:
      return { ...state, likes: action.payload, loading: false };
    default:
      return state;
  }
};
export default getlikesReducer;
