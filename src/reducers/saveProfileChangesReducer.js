import { SAVE_PROFILE_CHANGES } from '../actions/actionType';

export const initState = {
  user: {},
  loading: false,
};
const saveProfileChangesReducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_PROFILE_CHANGES:
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
};
export default saveProfileChangesReducer;
