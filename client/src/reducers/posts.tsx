import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

const posts = (state = [], action: any) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_BY_SEARCH:
      return {...state, posts: action.payload}
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((post: any) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return state.filter((post: any) => post._id !== action.payload);
    default:
      return state;
  }
};

export default posts;
