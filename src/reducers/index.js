import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import articleReducer from './articleReducer';
import userDetailsReducer from './userDetailsReducer';
import uploadImageReducer from './uploadImageReducer';
import getLikesReducer from './getLikesReducer';
import searchUsersReducer from './searchUsersReducer';
import saveProfileChangesReducer from './saveProfileChangesReducer';
import followReducer from './followReducer';
import getFollowersReducer from './getFollowersReducer';
import communityArticlesReducer from './communityArticlesReducer';
import getConnectionsReducer from './getConnectionsReducer';
import getProfilesReducer from './getProfilesReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  articleState: articleReducer,
  userDetailsState: userDetailsReducer,
  uploadImageState: uploadImageReducer,
  likesState: getLikesReducer,
  searchState: searchUsersReducer,
  saveProfileChangesState: saveProfileChangesReducer,
  followState: followReducer,
  connectionsState: getFollowersReducer,
  communityArticlesState: communityArticlesReducer,
  networkState: getConnectionsReducer,
  explorePeopleState: getProfilesReducer,
});
export { rootReducer };
