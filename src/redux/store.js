import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./reducers";
import { setLogoutHandler } from "../webservice/Gate";
import { logout } from "./actions/authActions";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["ui"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // You can also add middleware or devTools if needed
});

// Set up the logout handler for the Gate module
setLogoutHandler(() => store.dispatch(logout()));

export const persistor = persistStore(store);

export default store;
