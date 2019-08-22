import { combineReducers } from "redux";
import { showSearchReducer } from "./showSearchReducer";
import { alertReducer } from "./alertReducer";
import { authReducer } from "./authReducer";
import { taskReducer } from "./taskReducer";

export default combineReducers({
  searchShow: showSearchReducer,
  alerts: alertReducer,
  auth: authReducer,
  tasks: taskReducer
});
