import {
  SHOW_SEARCH,
  HIDE_SEARCH,
  SET_ALERT,
  REMOVE_ALERT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_TASK,
  ADD_TASK,
  DELETE_TASK,
  RESET_TASK
} from "./types";
import uuid from "uuid/v4";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";

export const showSearch = () => dispatch => {
  dispatch({
    type: SHOW_SEARCH,
    payload: true
  });
};

export const hideSearch = () => dispatch => {
  dispatch({
    type: HIDE_SEARCH,
    payload: false
  });
};

export const setAlert = (msg, type, timeout = 5000) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeout
  );
};

// User
export const register = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    if (res) {
      dispatch(setAlert("New user was created", "success"));
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const auth = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.post("/api/users/auth");
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: AUTH_FAIL
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
    const res = await axios.post("/api/users/login", body, config);
    if (res) {
      dispatch(setAlert("You has logged in", "success"));
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.post("api/users/logout");
    if (res.status === 200) {
      dispatch(setAlert("You has logged out", "success"));
      dispatch({
        type: LOGOUT
      });
    }
  } catch (e) {
    dispatch(setAlert("Something went wrong", "danger"));
    console.log(e);
  }
};

// Task
export const getTasks = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("./api/tasks");
    if (res.status === 200) {
      dispatch({
        type: GET_TASK,
        payload: res.data
      });
    }
  } catch (e) {
    setAlert("Something went wrong", "danger");
  }
};

export const addTask = title => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ title });

  console.log(body);

  try {
    const res = await axios.post("/api/tasks", body, config);
    if (res) {
      dispatch(setAlert("You has added a task", "success"));
    }
    dispatch(hideSearch());
    dispatch(getTasks());
    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
  } catch (e) {
    setAlert("Something went wrong", "danger");
  }
};

export const deleteTask = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/tasks/${id}`);
    if (res.status === 200) {
      dispatch(setAlert("You has deleted a task", "success"));
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    }
  } catch (e) {
    setAlert("Something went wrong", "danger");
  }
};

export const resetTask = () => dispatch => {
  dispatch({
    type: RESET_TASK,
    payload: []
  });
};
