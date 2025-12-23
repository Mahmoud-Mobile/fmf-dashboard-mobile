import { login as loginUser } from "../../webservice/apiConfig";
import * as SecureStore from "expo-secure-store";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_EMAIL,
  SET_PASSWORD,
  SET_ROLE_PERMISSION,
} from "./actionTypes";

export const login = (params) => async (dispatch) => {
  try {
    const response = await loginUser(params);
    const token = response?.accessToken || response?.token;

    if (token) {
      console.log("Setting access token:", token);
      await SecureStore.setItemAsync("accessToken", token);
      await SecureStore.setItemAsync("userInfo", JSON.stringify(response));

      // Extract and store rolePermission
      const rolePermission = response?.user?.role || null;
      dispatch({ type: LOGIN_SUCCESS, payload: response });
      dispatch({ type: SET_ROLE_PERMISSION, payload: rolePermission });
      return { type: LOGIN_SUCCESS, payload: response };
    } else {
      console.log("Login failed: No access token in response");
      dispatch({ type: LOGIN_FAILURE, payload: "No access token" });
      return { type: LOGIN_FAILURE };
    }
  } catch (error) {
    console.log("Login failed with error:", error);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    return { type: LOGIN_FAILURE };
  }
};

export const logout = () => async (dispatch) => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("userInfo");
  console.log("User logged out");
  dispatch({ type: LOGOUT });
};

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setPassword = (password) => ({
  type: SET_PASSWORD,
  payload: password,
});

export const setRolePermission = (rolePermission) => ({
  type: SET_ROLE_PERMISSION,
  payload: rolePermission,
});
