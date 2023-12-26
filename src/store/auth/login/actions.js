import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  RESET_LOGIN_FLAG,
  SET_CAREER,
  LOGIN_USER_RESTORE
} from "./actionTypes";

export const 
loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginRestore = (user, history) => {
  return {
    type: LOGIN_USER_RESTORE,
    payload: user,
  };
};


export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const setCareer = career => {
  return {
    type: SET_CAREER,
    payload: career,
  };
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const socialLogin = (type, history) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { type, history },
  };
};

export const resetLoginFlag = () => {
  return {
    type: RESET_LOGIN_FLAG,
  }
}
