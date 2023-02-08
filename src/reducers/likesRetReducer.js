import { GET_LIKES } from "../actions/actionType";

const initState = {
    likes: [],
};

const likesRetReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_LIKES:
            return { ...state, likes: action.payload };
        default:
            return state;
    }
}

export default likesRetReducer;