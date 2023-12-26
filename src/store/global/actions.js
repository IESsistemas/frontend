import {
  SET_LOADING,
  SET_GLOBAL_LOADING
} from "./actionTypes";


export const setGlobalLoading = (isLoading) => {
  return {
    type: SET_GLOBAL_LOADING,
    payload: isLoading,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};