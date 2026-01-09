import { login as loginUser } from "../../webservice/apiConfig";
import * as SecureStore from "expo-secure-store";
import { Storage } from "expo-storage";
import * as Device from "expo-device";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_EMAIL,
  SET_PASSWORD,
  SET_ROLE_PERMISSION,
  SET_EXHIBITOR_ID,
  SET_EXHIBITOR,
} from "./actionTypes";

export const login =
  (params, showAlert = true, deviceToken = null) =>
  async (dispatch) => {
    try {
      // Build additional headers for device information
      const additionalHeaders = {
        "X-Device-Token": deviceToken || params.deviceToken || "",
        "X-Device-ID": Device.osBuildId || "",
        "X-Device-Model": Device.modelId || Device.modelName || "",
        "X-OS-Version": Device.osVersion || "",
        "X-App-Version": "1.0.1",
      };

      const response = await loginUser(params, showAlert, additionalHeaders);
      const token = response?.access_token;

      if (token) {
        console.log("Setting access token:", token);
        await SecureStore.setItemAsync("accessToken", token);
        await SecureStore.setItemAsync("userInfo", JSON.stringify(response));

        const rolePermission =
          response?.user?.roles?.[0] || response?.user?.role || null;
        dispatch({ type: LOGIN_SUCCESS, payload: response });
        dispatch({ type: SET_ROLE_PERMISSION, payload: rolePermission });

        const selectedCategory = await Storage.getItem({
          key: "selected-category",
        });
        if (selectedCategory === "offerHome") {
          const exhibitor = response?.exhibitor ?? response?.payload?.exhibitor;

          if (exhibitor !== undefined && exhibitor !== null) {
            dispatch({ type: SET_EXHIBITOR, payload: exhibitor });
          }
        }

        return { type: LOGIN_SUCCESS, payload: response };
      } else {
        console.log("Login failed: No access token in response");
        dispatch({ type: LOGIN_FAILURE, payload: "No access token" });
        return { type: LOGIN_FAILURE, payload: "No access token" };
      }
    } catch (error) {
      const errorMessage =
        error?.errorMessage || error?.message || "Login failed";
      dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
      return {
        type: LOGIN_FAILURE,
        payload: errorMessage,
        status: error?.status,
        error: error,
      };
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("userInfo");
    await Storage.removeItem({ key: "selected-category" });
    await Storage.removeItem({ key: "active-env" });

    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch({ type: LOGOUT });
  }
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

export const setExhibitorId = (exhibitorId) => ({
  type: SET_EXHIBITOR_ID,
  payload: exhibitorId,
});

export const setExhibitor = (exhibitor) => ({
  type: SET_EXHIBITOR,
  payload: exhibitor,
});
