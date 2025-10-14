import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { setLogoutHandler } from "../webservice/Gate";
import { logout } from "./actions/authActions";

const store = configureStore({
  reducer: rootReducer,
  // You can also add middleware or devTools if needed
});

// Set up the logout handler for the Gate module
setLogoutHandler(() => store.dispatch(logout()));

export default store;
