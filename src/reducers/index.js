
import { combineReducers } from "redux";
import {userReducer} from './userReducer';
import articleReducer from "./articleReducer";
import userDetailsReducer from "./userDetailsReducer";
import uploadImageReducer from "./uploadImageReducer";
import likesReducer from "./likesReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
    userDetailsState: userDetailsReducer,
    uploadImageState: uploadImageReducer,
    likesState: likesReducer,
});
export {rootReducer};
