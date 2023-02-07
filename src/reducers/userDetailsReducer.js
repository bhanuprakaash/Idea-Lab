import {GET_USER_DETAILS} from '../actions/actionType.js';
const initialState = {
    userDetails:{},
    loading:false,
};
const userDetailsReducer=(state = initialState, action)=> {
    switch(action.type){
        case GET_USER_DETAILS:
            return {...state,userDetails:action.payload,loading:false}
        default:
            return state;
    }
}
export default userDetailsReducer;
