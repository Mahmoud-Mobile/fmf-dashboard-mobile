import axios from "axios";
import { getEnvVars } from "../constant";
import * as SecureStore from "expo-secure-store";
import navigationService from "../Global/navRef";

// Global logout handler - will be set by the application
let logoutHandler = null;

// Function to set the logout handler from outside this module
export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

async function createHeaders(jsonPayload) {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  // console.log("accessToken", accessToken);
  return {
    "Content-Type": jsonPayload ? "application/json" : "multipart/form-data",
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "correlation-id": generateCorrelationId(),
  };
}

function generateCorrelationId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function handleUnauthorized() {
  try {
    // Call the logout handler if it's been set
    if (logoutHandler) {
      logoutHandler();
    }

    // Navigate to Login screen if navigation is available
    if (navigationService.navigation) {
      navigationService.navigation.navigate("Login");
    }
  } catch (error) {
    console.error("Error handling unauthorized access:", error);
  }
}

function handleErrors(error) {
  const { response } = error;
  if (!response) {
    alert("Something went wrong. Please try again later.");
    return Promise.reject(error);
  }

  const { status, data } = response;

  let errorMessage = "";

  // Check if the error data contains an "errors" object and handle it
  if (data.errors && typeof data.errors === "object") {
    // Iterate over each field in the "errors" object
    for (const [field, message] of Object.entries(data.errors)) {
      errorMessage += `${field}: ${message}\n`;
    }
  } else if (typeof data === "object") {
    // If the data is an object without an "errors" field, show its content
    if (data.message) {
      errorMessage += `Message: ${data.message}\n`;
    }

    // If the data contains an array or other object structure, display it
    if (Array.isArray(data)) {
      errorMessage += `Errors: ${data.join(", ")}\n`;
    } else {
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          errorMessage += `${key}: ${value.join(", ")}\n`;
        } else {
          errorMessage += `${key}: ${value}\n`;
        }
      }
    }
  } else {
    // Handle plain text error messages (not an object)
    errorMessage = data;
  }

  // Handle different HTTP statuses and show detailed error messages
  switch (status) {
    case 400:
      // alert(errorMessage);
      break;
    case 401:
      alert("Unauthorized: The session has expired.");
      // Logout user and navigate to login for 401
      handleUnauthorized();
      break;
    case 403:
      alert("Forbidden: Access denied. Please login again.");
      // Logout user and navigate to login for 403
      handleUnauthorized();
      break;
    case 302:
      alert(data.message || "Redirected: " + errorMessage);
      break;
    case 404:
      // alert(
      //   data.message || "Not Found: The requested resource could not be found."
      // );
      break;
    case 500:
      break;
    default:
      alert(`Error ${status}: ${errorMessage}`);
  }

  return Promise.reject(error);
}

function buildQueryParams(data) {
  return Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
}

function buildFormData(data) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((element, index) => {
        if (typeof element === "object") {
          for (const [nestedKey, nestedValue] of Object.entries(element)) {
            formData.append(`${key}[${index}][${nestedKey}]`, nestedValue);
          }
        } else {
          formData.append(`${key}[${index}]`, element);
        }
      });
    } else {
      formData.append(key, value);
    }
  }
  return formData;
}
async function Post(url = "", data = {}, method = "POST", jsonPayload = false) {
  const baseURL = await getEnvVars("apiUrl");
  const fullUrl = baseURL + url;

  console.log("POST Request URL:", fullUrl);
  console.log("POST Request Params:", data);

  let formData;

  if (jsonPayload) {
    formData = JSON.stringify(data);
  } else {
    formData = buildFormData(data);
  }

  const headers = await createHeaders(jsonPayload);

  try {
    const response = await axios.request({
      method,
      url: fullUrl,
      headers: headers,
      responseType: "json",
      data: formData,
    });

    return response.data;
  } catch (error) {
    return handleErrors(error);
  }
}

async function Get(url = "", data = {}) {
  const baseURL = await getEnvVars("apiUrl");
  const fullUrl = `${baseURL}${url}?${buildQueryParams(data)}`;

  console.log("New Request", fullUrl);

  try {
    const response = await axios({
      method: "GET",
      url: fullUrl,
      headers: await createHeaders(false),
      responseType: "json",
    });
    return response.data;
  } catch (error) {
    return handleErrors(error);
  }
}

// PostC is an alias for Post with JSON payload
const PostC = (url, data, method = "POST") => Post(url, data, method, true);

export { Get, Post, PostC };
