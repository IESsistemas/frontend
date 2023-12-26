import {
  GET_CHECK_SERVE_SUCCESS,
  GET_CHECK_SERVE_FAIL,
} from "./actionTypes";

const initialState = {
  serve: false,
  error: "",
};

const CheckServe = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHECK_SERVE_SUCCESS:
      return {
        ...state,
        serve: action.payload,
      };

    case GET_CHECK_SERVE_FAIL:
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

export default CheckServe;
