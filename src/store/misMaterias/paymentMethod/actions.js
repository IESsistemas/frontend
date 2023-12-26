
import {
  GET_PAYMENT_METHOD,
  GET_PAYMENT_METHOD_SUCCESS,
  GET_PAYMENT_METHOD_FAIL,
} from "./actionTypes"

export const getPaymentMethod = ()=> ({
  type: GET_PAYMENT_METHOD,
})

export const getPaymentMethodSuccess = method => ({
  type: GET_PAYMENT_METHOD_SUCCESS,
  payload: method,
});

export const getPaymentMethodFail = error => ({
  type: GET_PAYMENT_METHOD_FAIL,
  payload: error,
});




