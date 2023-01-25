import {
    SET_LOADING_STATUS,GET_ARTICLES,
} from "../actions/actionType";

export const initState = {
    articles:[],
    loading:false,
};

const articleReducer=  (state=initState,action)=>{
    switch(action.type){
        case GET_ARTICLES:
            return {...state,articles:action.payload,loading:false};
        case SET_LOADING_STATUS:
            return {...state,loading:action.loading};
        
        default:
            return state;
    }
}
export default articleReducer; 