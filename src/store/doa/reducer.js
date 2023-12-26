import {
  GET_CHECK_INTERVIEW_SUCCESS,
  GET_INTERVIEW_DOA_SUCCESS,
  POST_APPLY_INTERVIEW,
  PUT_CANCEL_INTERVIEW,
  APPLY_INTERVIEW_SUCCESS,
  CANCEL_INTERVIEW_SUCCESS,
  GET_INTERVIEW_DOA_ERROR
} from "./actionTypes";

const initialState = {
  checkInterview: [],
  interview: [],
  error: false,
  apply: false,
  interviewError: false,
  cancel: false,
};


const Regulation = (state = initialState, action) => {
  switch (action.type) {

    case GET_CHECK_INTERVIEW_SUCCESS:
      return {
        ...state,
        checkInterview: action.payload,
      };

    case GET_INTERVIEW_DOA_SUCCESS:
      return {
        ...state,
        interview: action.payload,
      };

    case GET_INTERVIEW_DOA_ERROR:
      return {
        ...state,
        interviewError: action.payload,
      };
    case POST_APPLY_INTERVIEW:
      state = {
        ...state,
        error: false,
      };
    case APPLY_INTERVIEW_SUCCESS:
      state = {
        ...state,
        apply: action.payload
      };

    case PUT_CANCEL_INTERVIEW:
      state = {
        ...state,
        error: false,
      };
      break;
    case CANCEL_INTERVIEW_SUCCESS:
      state = {
        ...state,
        cancel: true
      };
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default Regulation;
