import { UPLOAD_IMAGE } from "../actions/actionType";

const initState = {
    loading: false,
    image: null,
};

const uploadImageReducer = (state = initState, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return { ...state, image: action.payload, loading: false };
        default:
            return state;
    }
}

export default uploadImageReducer;