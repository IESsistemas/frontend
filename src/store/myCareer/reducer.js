import {
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
} from "./actionTypes";

const initialState = {
  messages: [],
  errorMsg: "",
};

const MyCareer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };
    case GET_MESSAGES_FAIL:
      state = {
        ...state,
        errorMsg: false,
      };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default MyCareer;
