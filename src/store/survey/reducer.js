import {
  GET_SURVEYS_SUCCESS,
  GET_SURVEYS_FAIL,
  GET_SURVEY_QUESTIONS_SUCCESS,
  POST_ANSWERS
} from "./actionTypes";

const initialState = {
  survey: [],
  questions: [],
  success: false,
  error: false
};

const Survey = (state = initialState, action) => {
  switch (action.type) {
    case GET_SURVEYS_SUCCESS:
      return {
        ...state,
        survey: action.payload,
      };

    case GET_SURVEYS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SURVEY_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      };
    case POST_ANSWERS:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default Survey;
