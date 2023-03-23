import { RETRIEVE_CONNECTIONS } from '../actions/actionType';
const initialState = {
  connections: [],
};

const getFollowersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_CONNECTIONS:
      return { ...state, connections: action.payload };
    default:
      return state;
  }
};

export default getFollowersReducer;
