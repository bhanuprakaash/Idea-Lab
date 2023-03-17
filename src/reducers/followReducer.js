import {HANDLE_FOLLOW} from '../actions/actionType';

const initialState = {
    followers: [],
};

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_FOLLOW:
            return {...state, followers: action.payload};
        default:
            return state;
    }
};

export default followReducer;