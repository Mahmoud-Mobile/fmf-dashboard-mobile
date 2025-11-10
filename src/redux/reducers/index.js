import { combineReducers } from "redux";
import authReducer from "./authReducer";
import apiReducer from "./apiReducer";
import uiReducer from "./uiReducer";

export default combineReducers({
  auth: authReducer,
  api: apiReducer,
  ui: uiReducer,
});
