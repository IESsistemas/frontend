import {
  GET_RAPIPAGO_SUCCESS,
  GET_RAPIPAGO_FAIL,
  POST_BARCODE_SUCCESS,
  POST_BARCODE_FAIL
} from "./actionTypes";

const initialState = {
  data: [],
  errorMsg: "",
  barcode: [],
  errorBarcode: ""
};

const Rapipago = (state = initialState, action) => {
  switch (action.type) {
    case GET_RAPIPAGO_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case GET_RAPIPAGO_FAIL:
      return {
        ...state,
        errorMsg: false,
      };
      case POST_BARCODE_SUCCESS:
        return {
          ...state,
          barcode: action.payload,
        };
      case POST_BARCODE_FAIL:
        state = {
          ...state,
          errorBarcode: false,
        };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default Rapipago;
