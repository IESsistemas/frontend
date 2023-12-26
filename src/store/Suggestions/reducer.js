import {
  GET_AREAS,
  GET_AREAS_SUCCESS,
  GET_AREAS_FAIL,
  POST_SUGGESTIONS,
  API_ERROR
} from "./actionTypes";

const initialState = {
  dni: null,
  areas: [],
  message: null,
  loading: false,
  success: false,
  error: false,
  errorMsg: "",
  
};

const Suggestions = (state = initialState, action) => {
  switch (action.type) {
    case GET_AREAS_SUCCESS:
      return {
        ...state,
        areas: action.payload,
      };

    case GET_AREAS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

      case POST_SUGGESTIONS:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
      case API_ERROR:
      state = {
        ...state,
        errorMsg: action.payload,
        error: true,
      };
      break;
      default:
        state = { ...state };
        break;
      
  }
  return state;
};

export default Suggestions;
