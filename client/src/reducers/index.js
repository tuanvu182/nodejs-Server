import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { alertReducer } from "./alertReducer";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReduce";

export default combineReducers({
  form: formReducer,
  alerts: alertReducer,
  auth: authReducer,
  posts: postReducer
});
