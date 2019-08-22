import { GET_TASK, ADD_TASK, DELETE_TASK, RESET_TASK } from "../actions/types";

const initialState = [];

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK:
    case RESET_TASK:
      return [...action.payload];
    case ADD_TASK:
      return [...action.payload, ...state];
    case DELETE_TASK:
      return state.filter(task => task._id !== action.payload);
    default:
      return state;
  }
};
