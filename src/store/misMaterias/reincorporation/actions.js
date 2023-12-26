
import {
  GET_REINCORPORATION,
  GET_REINCORPORATION_SUCCESS,
  GET_REINCORPORATION_FAIL,
  POST_REINCORPORATION,
  SUGGESTIONS_API_ERROR
} from "./actionTypes"

export const getReincorporation = id => ({
  type: GET_REINCORPORATION,
  idCarrera: id
})

export const getReincorporationSuccess = library => ({
  type: GET_REINCORPORATION_SUCCESS,
  payload: library,
});

export const getReincorporationFail = error => ({
  type: GET_REINCORPORATION_FAIL,
  payload: error,
});

export const reincorporation = data => {
  return {
    type: POST_REINCORPORATION,
    payload: data,
  };
};

export const reincorporationError = error => {
  return {
    type: SUGGESTIONS_API_ERROR,
    payload: error,
  };
};



