import { GET_CONNECTIONS } from '../actions/actionType';
const initialState = {
  connections: [],
};
const getConnectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
      };
    default:
      return state;
  }
};
export default getConnectionsReducer;
