import {
  GET_CHECK_INTERVIEW,
  GET_CHECK_INTERVIEW_SUCCESS,
  GET_INTERVIEW_DOA,
  GET_INTERVIEW_DOA_SUCCESS,
  POST_APPLY_INTERVIEW,
  PUT_CANCEL_INTERVIEW,
  APPLY_INTERVIEW_SUCCESS,
  CANCEL_INTERVIEW_SUCCESS,
  GET_INTERVIEW_DOA_ERROR
} from "./actionTypes"

export const getCheckInterview = (token) => ({
  type: GET_CHECK_INTERVIEW,
  payload: token
})

export const getCheckInterviewSuccess = checkInterview => ({
  type: GET_CHECK_INTERVIEW_SUCCESS,
  payload: checkInterview,
});

export const getInterviewDoa = () => ({
  type: GET_INTERVIEW_DOA,
})

export const getInterviewDoaSuccess = interview => ({
  type: GET_INTERVIEW_DOA_SUCCESS,
  payload: interview,
});

export const getInterviewDoaError = error => ({
  type: GET_INTERVIEW_DOA_ERROR,
  payload: error,
})

export const applyInterview = (data, history) => {
  return {
    type: POST_APPLY_INTERVIEW,
    payload: { data, history },
  };
};

export const applyInterviewSuccess = success => ({
  type: APPLY_INTERVIEW_SUCCESS,
  payload: success
});



export const cancelInterview = (data, history) => {
  return {
    type: PUT_CANCEL_INTERVIEW,
    payload: { data, history },
  };
};

export const cancelInterviewSuccess = () => ({
  type: CANCEL_INTERVIEW_SUCCESS,
});
