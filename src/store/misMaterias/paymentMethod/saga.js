import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_PAYMENT_METHOD } from "./actionTypes";
import { getPaymentMethodFail, getPaymentMethodSuccess } from "./actions";
import { getPaymentMethod } from "../../../helpers/iesback_helper";



function* onGetPaymentMethod() {
  window.loading(true);
  try {
    const response = yield call(getPaymentMethod)
    console.log(response)
    yield put(getPaymentMethodSuccess(response))
    
    window.loading(false);
  } catch (error) {
    yield put(getPaymentMethodFail(error))
    window.loading(false);
  }
}


function* PaymentMethodSaga() {
  yield takeEvery(GET_PAYMENT_METHOD, onGetPaymentMethod);
}

export default PaymentMethodSaga;
