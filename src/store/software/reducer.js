import {
  POST_SOFTWARE,
  GET_SOFTWARE_SUCCESS,
  POST_REQUIREMENT
} from "./actionTypes";

const initialState = {
  condition: false,
  software: []
};

const Suggestions = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUIREMENT:
      state = {
        ...state,
        condition: true,
      };
      break;
    case GET_SOFTWARE_SUCCESS:
      return {
        ...state,
        software: action.payload,
      };
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default Suggestions;
