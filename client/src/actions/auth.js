import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT
} from "./types";
import { setAlert } from "../actions/alert";
import { postClear, postGet } from "../actions/post";
import setAuthToken from "../helpers/setAuthToken";

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/v1/users", body, config);
    dispatch(setAlert("New user was created", "success"));
    return dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch(setAlert(e.response.data.error, "danger"));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/v1/users/login", body, config);
    dispatch(setAlert("You logged in", "success"));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(postGet());
  } catch (e) {
    dispatch(setAlert(e.response.data.error, "danger"));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const auth = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/v1/users/auth");
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });
    dispatch(postGet());
  } catch (e) {
    dispatch({
      type: AUTH_FAIL
    });
  }
};

export const logout = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.post("/api/v1/users/logout");
    if (res.status === 200) {
      dispatch(setAlert("You was logged out", "success"));
      dispatch({
        type: LOGOUT
      });
      dispatch(postClear());
    }
  } catch (e) {
    console.log(e.response);
  }
};
