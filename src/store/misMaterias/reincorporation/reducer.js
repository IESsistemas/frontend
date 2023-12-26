import {
  GET_REINCORPORATION_SUCCESS,
  GET_REINCORPORATION_FAIL,
  POST_REINCORPORATION
} from "./actionTypes";

const initialState = {
  reincorporation: [],
  errorMsg: "",
};

const Reincorporation = (state = initialState, action) => {
  switch (action.type) {
    case GET_REINCORPORATION_SUCCESS:
      return {
        ...state,
        reincorporation: action.payload,
      };
    case GET_REINCORPORATION_FAIL:
      state = {
        ...state,
        errorMsg: false,
      };
    case POST_REINCORPORATION:
      state = {
        ...state,
        error: false,
      };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default Reincorporation;
