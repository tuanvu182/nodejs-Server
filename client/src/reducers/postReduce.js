import {
  POST_CREATE,
  POST_EDIT,
  POST_REMOVE,
  POST_GET,
  POST_CLEAR
} from "../actions/types";

const initialState = [];

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_GET:
      return [...action.payload];
    case POST_CREATE:
      return [action.payload, ...state];
    case POST_CLEAR:
      return [];
    case POST_EDIT:
      const newState = state.map(post =>
        post._id === action.payload._id ? action.payload : post
      );
      return newState;
    case POST_REMOVE:
      return state.filter(post => post._id !== action.payload);
    default:
      return state;
  }
};
