import {
  POST_PAYMENT_BUTTON_SUCCESS,
  POST_PAYMENT_BUTTON_FAIL,
} from "./actionTypes";

const initialState = {
  result: "",
  errorMsg: "",
};

const PaymentButton = (state = initialState, action) => {
  switch (action.type) {
    case POST_PAYMENT_BUTTON_SUCCESS:
      return {
        ...state,
        result: action.payload,
      };

    case POST_PAYMENT_BUTTON_FAIL:
      return {
        ...state,
        errorMsg: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default PaymentButton;
