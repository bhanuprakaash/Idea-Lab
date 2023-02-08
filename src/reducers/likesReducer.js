import { HANDLE_LIKES } from "../actions/actionType";

const initState = {
    likes: [],
};

const likesReducer = (state = initState, action) => {
    switch (action.type) {
        case HANDLE_LIKES:
            return { ...state, likes: action.payload };
        default:
            return state;
    }
};

export default likesReducer;
