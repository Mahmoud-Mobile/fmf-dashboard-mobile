import { loginUser } from "../../webservice/apiConfig";
import * as SecureStore from "expo-secure-store";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_MOBILE = "SET_MOBILE";
export const SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD";
export const SET_NEW_PASSWORD = "SET_NEW_PASSWORD";
export const SET_CONFIRM_NEW_PASSWORD = "SET_CONFIRM_NEW_PASSWORD";

export const SET_FNAME = "SET_FNAME";
export const SET_LNAME = "SET_LNAME";
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_AREA = "SET_AREA";
export const SET_ADDRESS = "SET_ADDRESS";
export const SET_IMAGE = "SET_IMAGE";

export const login = (params) => async (dispatch) => {
  try {
    const response = await loginUser(params);
    // The token is directly available in response.token
    const token = response?.token;

    if (token) {
      console.log("Setting access token:", token);
      await SecureStore.setItemAsync("accessToken", token);
      await SecureStore.setItemAsync("userInfo", JSON.stringify(response));

      dispatch({ type: LOGIN_SUCCESS, payload: response });
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

  // Dispatch the LOGOUT action to update the Redux state
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

export const setMobile = (mobile) => ({
  type: SET_MOBILE,
  payload: mobile,
});

export const setConfirmPassword = (confirmPassword) => ({
  type: SET_CONFIRM_PASSWORD,
  payload: confirmPassword,
});
export const setNewPassword = (newPassword) => ({
  type: SET_NEW_PASSWORD,
  payload: newPassword,
});
export const setConfirmNewPassword = (confirmNewPassword) => ({
  type: SET_CONFIRM_NEW_PASSWORD,
  payload: confirmNewPassword,
});
export const setFname = (fname) => ({
  type: SET_FNAME,
  payload: fname,
});

export const setLname = (lname) => ({
  type: SET_LNAME,
  payload: lname,
});

export const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});

export const setArea = (area) => ({
  type: SET_AREA,
  payload: area,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const setImage = (image) => ({
  type: SET_IMAGE,
  payload: image,
});
