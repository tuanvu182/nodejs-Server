import axios from "axios";
import {
  POST_CREATE,
  POST_EDIT,
  POST_GET,
  POST_REMOVE,
  POST_CLEAR
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../helpers/setAuthToken";

export const postCreate = ({ title, content }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ title, content });
  try {
    const res = await axios.post("/api/v1/posts", body, config);
    dispatch(setAlert("New post was created", "success"));
    dispatch({
      type: POST_CREATE,
      payload: res.data
    });
  } catch (e) {
    console.log(e);
  }
};

export const postGet = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const res = await axios.get("/api/v1/posts/current_user");
    dispatch({
      type: POST_GET,
      payload: res.data
    });
  } catch (e) {
    console.log(e);
  }
};

export const postClear = () => dispatch => {
  dispatch({
    type: POST_CLEAR
  });
};

export const postEdit = ({ title, content, id }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ title, content });
  try {
    const res = await axios.patch(`/api/v1/posts/${id}`, body, config);
    dispatch(setAlert("Post was edit", "success"));
    dispatch({
      type: POST_EDIT,
      payload: res.data
    });
  } catch (e) {
    console.log(e);
  }
};

export const postDelete = id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const res = await axios.delete(`/api/v1/posts/${id}`);
    if (res.status === 200) {
      dispatch(setAlert("Post was removed", "success"));
      dispatch({
        type: POST_REMOVE,
        payload: id
      });
    }
  } catch (e) {
    console.log(e);
  }
};
