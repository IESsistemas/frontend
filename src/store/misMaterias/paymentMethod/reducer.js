import {
  GET_PAYMENT_METHOD_SUCCESS,
  GET_PAYMENT_METHOD_FAIL,
} from "./actionTypes";

const initialState = {
  method: [],
  message: "",
  errorMsg: "",
};

const PaymentMethod = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        method: action.payload,
      };

    case GET_PAYMENT_METHOD_FAIL:
      return {
        ...state,
        message: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default PaymentMethod;
