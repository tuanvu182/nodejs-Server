import { SHOW_SEARCH, HIDE_SEARCH } from "../actions/types";

const initialState = false;

export const showSearchReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SHOW_SEARCH:
      newState = action.payload;
      return newState;
    case HIDE_SEARCH:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
};
