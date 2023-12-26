import {
  POST_REQUIREMENT,
  GET_SOFTWARE,
  GET_SOFTWARE_SUCCESS,
  POST_SOFTWARE
} from "./actionTypes"


export const rqSoftware = (data, history) => {
  return {
    type: POST_REQUIREMENT,
    payload: { data, history },
  };
};

export const getSoftware = () => ({
  type: GET_SOFTWARE,
})

export const getSoftwareSuccess = software => ({
  type: GET_SOFTWARE_SUCCESS,
  payload: software,
});

export const postRqSoftware = (data, history) => {
  return {
    type: POST_SOFTWARE,
    payload: { data, history },
  };
};




