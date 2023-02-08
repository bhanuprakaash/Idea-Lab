import {GET_COMMENTS} from '../actions/actionType.js';
const initialState = {
    comments:[],
};
const commentsRetReducer=(state = initialState, action)=> {
    switch(action.type){
        case GET_COMMENTS:
            return {...state,comments:action.payload}
        default:
            return state;
    }
};
export default commentsRetReducer;
