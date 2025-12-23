import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_EMAIL,
  SET_PASSWORD,
  SET_ROLE_PERMISSION,
} from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  email: "",
  password: "",
  rolePermission: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
        rolePermission: null,
      };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_ROLE_PERMISSION:
      return { ...state, rolePermission: action.payload };
    default:
      return state;
  }
}
