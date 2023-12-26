import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RESET_LOGIN_FLAG,
  SET_CAREER,
  LOGIN_USER_RESTORE
} from "./actionTypes";

const initialState = {
  errorMsg: "",
  loading: false,
  error: false,
  userData: {}
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case LOGIN_USER_RESTORE:
      state = {
        ...state,
        loading: false,
        error: false,
        userData: action.payload
      };
    break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: false,
        userData: action.payload
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true };
      break;
    case API_ERROR:
      state = {
        ...state,
        errorMsg: action.payload,
        loading: true,
        error: true,
        isUserLogout: false,
      };
      break;
    case RESET_LOGIN_FLAG:
      state = {
        ...state,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;
    case SET_CAREER: {
      state = {
        ...state,
        carrerSelected: action.payload,
      }
    }break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
