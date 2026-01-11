import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_EMAIL,
  SET_PASSWORD,
  SET_ROLE_PERMISSION,
  SET_EXHIBITOR_ID,
  SET_EXHIBITOR,
  SET_PARTICIPANT_ID_WITH_ASSIGN_BY_AMBASSADOR,
} from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  email: "",
  password: "",
  rolePermission: null,
  exhibitorId: [],
  exhibitor: null,
  participantIdWithAssignByAmbassador: "73873287328923",
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
        exhibitorId: [],
        exhibitor: null,
        participantIdWithAssignByAmbassador: null,
      };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_ROLE_PERMISSION:
      return { ...state, rolePermission: action.payload };
    case SET_EXHIBITOR_ID:
      return { ...state, exhibitorId: action.payload };
    case SET_EXHIBITOR:
      return { ...state, exhibitor: action.payload };
    case SET_PARTICIPANT_ID_WITH_ASSIGN_BY_AMBASSADOR:
      return { ...state, participantIdWithAssignByAmbassador: action.payload };
    default:
      return state;
  }
}
