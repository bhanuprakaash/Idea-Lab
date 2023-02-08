import { HANDLE_COMMENTS } from "../actions/actionType";

const initState = {
    comments: [],
};

const commentsReducer = (state = initState, action) => {
    switch (action.type) {
        case HANDLE_COMMENTS:
            return { ...state, comments: action.payload };
        default:
            return state;
    }
};

export default commentsReducer;