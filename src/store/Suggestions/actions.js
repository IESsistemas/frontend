import {
  GET_AREAS,
  GET_AREAS_FAIL,
  GET_AREAS_SUCCESS,
  POST_SUGGESTIONS,
  API_ERROR
} from "./actionTypes"

export const getAreas = () => ({
  type: GET_AREAS,
})

export const getAreasSuccess = areas => ({
  type: GET_AREAS_SUCCESS,
  payload: areas,
});

export const getAreasFail = error => ({
  type: GET_AREAS_FAIL,
  payload: error,
});

export const suggestions = (data, history) => {
  return {
    type: POST_SUGGESTIONS,
    payload: { data, history },
  };
};

export const suggestionApiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};


