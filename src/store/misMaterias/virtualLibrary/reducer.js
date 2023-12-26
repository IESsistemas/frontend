import {
  GET_LIBRARY_SUCCESS,
  GET_LIBRARY_FAIL,
} from "./actionTypes";

const initialState = {
  library: [],
  errorMsg: "",
};

const VirtualLibrary = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIBRARY_SUCCESS:
      return {
        ...state,
        library: action.payload,
      };

    case GET_LIBRARY_FAIL:
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

export default VirtualLibrary;
