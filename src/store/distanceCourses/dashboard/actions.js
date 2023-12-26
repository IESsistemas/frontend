
import {
  GET_CHECK_SERVE,
  GET_CHECK_SERVE_SUCCESS,
  GET_CHECK_SERVE_FAIL,
} from "./actionTypes"

export const getCheckServer = () => ({
  type: GET_CHECK_SERVE,
})

export const getCheckServerSuccess = serve => ({
  type: GET_CHECK_SERVE_SUCCESS,
  payload: serve,
});
export const getCheckServerFail = error => ({
  type: GET_CHECK_SERVE_FAIL,
  payload: error,
});


