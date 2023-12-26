import {
  GET_FILE_DOCUMENTATION_SUCCESS,
  GET_FILE_DOCUMENTATION_FAIL,
} from "./actionTypes";

const initialState = {
  data: [],
  success: false,
  error: false
};

const Suggestions = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILE_DOCUMENTATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };

    case GET_FILE_DOCUMENTATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default Suggestions;
