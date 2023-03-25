import { COMMUNITY_ARTICLES, SET_LOADING_STATUS } from '../actions/actionType';

const initialState = {
  communityArticles: [],
  loading: false,
};

const communityArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMUNITY_ARTICLES:
      return { ...state, communityArticles: action.payload };
    case SET_LOADING_STATUS:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
export default communityArticlesReducer;
