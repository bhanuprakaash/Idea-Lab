import {SEARCH_USERS} from '../actions/actionType';
const initState = {
    users: [],
};
const searchUsersReducers = (state = initState, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return { ...state, users: action.payload };
        default:
            return state;
    }
}
export default searchUsersReducers;

