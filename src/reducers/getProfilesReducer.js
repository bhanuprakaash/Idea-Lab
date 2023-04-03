import { GET_PROFILES } from '../actions/actionType';
const initialState = {
  profiles: [],
};
const getProfilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    default:
      return state;
  }
};
export default getProfilesReducer;
