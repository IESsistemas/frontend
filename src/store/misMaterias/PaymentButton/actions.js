
import {
  POST_PAYMENT_BUTTON,
  POST_PAYMENT_BUTTON_SUCCESS,
  POST_PAYMENT_BUTTON_FAIL,
} from "./actionTypes"

export const postPaymentButton = (data, history)=> ({
  type: POST_PAYMENT_BUTTON,
  payload: { data, history },
})

export const postPaymentButtonSuccess = result => ({
  type: POST_PAYMENT_BUTTON_SUCCESS,
  payload: result,
});

export const postPaymentButtonFail = error => ({
  type: POST_PAYMENT_BUTTON_FAIL,
  payload: error,
});




