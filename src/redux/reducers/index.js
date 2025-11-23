import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./authReducer";
import apiReducer from "./apiReducer";
import uiReducer from "./uiReducer";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["user", "isLoggedIn"],
};

const uiPersistConfig = {
  key: "ui",
  storage: AsyncStorage,
  whitelist: ["disabledIcons"], // Persist disabled icons state
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  api: apiReducer,
  ui: persistReducer(uiPersistConfig, uiReducer),
});
