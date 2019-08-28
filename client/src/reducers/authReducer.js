import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  auth: null,
  user: null,
  loading: true
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return (state = {
        ...state,
        token: action.payload.token,
        auth: true,
        user: action.payload.user.name,
        loading: false
      });
    case AUTH_SUCCESS:
      return (state = {
        ...state,
        auth: true,
        user: action.payload.name,
        loading: false
      });
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return (state = {
        ...state,
        token: null,
        auth: false,
        user: null,
        loading: false
      });
    default:
      return state;
  }
};
