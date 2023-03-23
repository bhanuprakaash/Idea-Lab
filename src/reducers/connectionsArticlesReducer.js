import { CONNECTIONS_ARTICLES } from '../actions/actionType';

const initialState = {
  connectionsArticles: [],
};

const connectionsArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTIONS_ARTICLES:
      return { ...state, connectionsArticles: action.payload };
    default:
      return state;
  }
};

export default connectionsArticlesReducer;
