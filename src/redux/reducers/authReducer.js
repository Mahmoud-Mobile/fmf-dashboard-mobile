import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_EMAIL,
  SET_PASSWORD,
  SET_MOBILE,
  SET_CONFIRM_PASSWORD,
  SET_CONFIRM_NEW_PASSWORD,
  SET_NEW_PASSWORD,
  SET_FNAME,
  SET_LNAME,
  SET_COUNTRY,
  SET_AREA,
  SET_ADDRESS,
  SET_IMAGE,
} from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  email: "",
  password: "",
  mobile: "",
  confirmPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  fname: "",
  lname: "",
  country: "",
  area: "",
  address: "",
  image: "",
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
      };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_MOBILE:
      return { ...state, mobile: action.payload };
    case SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };
    case SET_NEW_PASSWORD:
      return {
        ...state,
        newPassword: action.payload,
      };
    case SET_CONFIRM_NEW_PASSWORD:
      return {
        ...state,
        confirmNewPassword: action.payload,
      };
    case SET_FNAME:
      return { ...state, fname: action.payload };
    case SET_LNAME:
      return { ...state, lname: action.payload };
    case SET_COUNTRY:
      return { ...state, country: action.payload };
    case SET_AREA:
      return { ...state, area: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case SET_IMAGE:
      return { ...state, image: action.payload };

    default:
      return state;
  }
}
