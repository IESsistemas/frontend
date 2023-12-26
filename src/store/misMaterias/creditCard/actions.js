
import {
  POST_CREDIT_CARD,
  POST_CREDIT_CARD_SUCCESS,
  POST_CREDIT_CARD_FAIL,
  GET_PAYMENTS_PENDING,
  GET_PAYMENTS_PENDING_SUCCESS,
  GET_PAYMENTS_PENDING_FAIL,
  GET_REJECTED_CARD,
  GET_REJECTED_CARD_SUCCESS,
  GET_REJECTED_CARD_FAIL
} from "./actionTypes"

export const postCreditCard =  (data, history) => ({
  type: POST_CREDIT_CARD,
  payload: {data, history}
})

export const postScholarshipSuccess = success => ({
  type: POST_CREDIT_CARD_SUCCESS,
  payload: success,
});

export const postScholarshipFail = error => ({
  type: POST_CREDIT_CARD_FAIL,
  payload: error,
});

export const getPaymentsPending = () => ({
  type: GET_PAYMENTS_PENDING,
})

export const getPaymentsPendingSuccess = payment => ({
  type: GET_PAYMENTS_PENDING_SUCCESS,
  payload: payment,
});

export const getPaymentsPendingFail = error => ({
  type: GET_PAYMENTS_PENDING_FAIL,
  payload: error,
});

export const getRejectedCard =  () => ({
  type: GET_REJECTED_CARD,
})

export const getRejectedCardSuccess = rejected => ({
  type: GET_REJECTED_CARD_SUCCESS,
  payload: rejected,
});

export const getRejectedCardFail = error => ({
  type: GET_REJECTED_CARD_FAIL,
  payload: error,
});





