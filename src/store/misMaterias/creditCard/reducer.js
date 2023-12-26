import {
  POST_CREDIT_CARD_SUCCESS,
  POST_CREDIT_CARD_FAIL,
  GET_PAYMENTS_PENDING_SUCCESS,
  GET_PAYMENTS_PENDING_FAIL,
  GET_REJECTED_CARD_SUCCESS,
  GET_REJECTED_CARD_FAIL
} from "./actionTypes";

const initialState = {
  success: false,
  errorMsg: "",
  paymentPending: [],
  errorMsgPayment: "",
  rejectedCard: [],
  errorMsgRejected: ""
};

const CreditCard = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case POST_CREDIT_CARD_FAIL:
      return {
        ...state,
        errorMsg: false,
      };
    case GET_PAYMENTS_PENDING_SUCCESS:
      return {
        ...state,
        paymentPending: action.payload,
      };
    case GET_PAYMENTS_PENDING_FAIL:
      return {
        ...state,
        errorMsgPayment: false,
      };
    case GET_REJECTED_CARD_SUCCESS:
      return {
        ...state,
        rejectedCard: action.payload,
      };
    case GET_REJECTED_CARD_FAIL:
      return {
        ...state,
        errorMsgRejected: false,
      };
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default CreditCard;
