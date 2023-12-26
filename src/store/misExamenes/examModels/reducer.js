import {
  GET_EXAM_MODEL_SUCCESS,
  GET_EXAM_MODEL_FAIL,
  GET_DOWNLOAD_EXAM_SUCCESS,
  GET_DOWNLOAD_EXAM_FAIL
} from "./actionTypes";

const initialState = {
  exams: [],
  errorMsg: "",
  file: [],
  errorFile: "",
};

const ExamModels = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXAM_MODEL_SUCCESS:
      return {
        ...state,
        exams: action.payload,
      };
    case GET_EXAM_MODEL_FAIL:
      state = {
        ...state,
        errorMsg: false,
      };
    
      case GET_DOWNLOAD_EXAM_SUCCESS:
      return {
        ...state,
        file: action.payload,
      };
      case GET_DOWNLOAD_EXAM_FAIL:
      return {
        ...state,
        errorFile: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default ExamModels;
