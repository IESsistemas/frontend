import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { POST_PAYMENT_BUTTON } from "./actionTypes";
import { postPaymentButtonFail, postPaymentButtonSuccess } from "./actions";
import { postPaymentButton } from "../../../helpers/iesback_helper";



function* onPostPaymentButton({ payload: { data, history } }) {
  window.loading(true);
  try {

    const response = yield call(postPaymentButton, data)
    yield put(postPaymentButtonSuccess(response))
    const newHTML = response; 
    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(newHTML);
    newWindow.document.close();

    window.loading(false);
  } catch (error) {
    yield put(postPaymentButtonFail(error))
    window.loading(false);
  }
}


function* PaymentButtonSaga() {
  yield takeEvery(POST_PAYMENT_BUTTON, onPostPaymentButton);
}

export default PaymentButtonSaga;
