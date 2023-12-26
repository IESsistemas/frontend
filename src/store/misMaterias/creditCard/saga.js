import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { POST_CREDIT_CARD,GET_PAYMENTS_PENDING, GET_REJECTED_CARD } from "./actionTypes";
import { postScholarshipSuccess, postScholarshipFail, getPaymentsPendingFail, getPaymentsPendingSuccess} from "./actions";
import { postCreditCard, getPaymentsPending, getRejectedCard} from "../../../helpers/iesback_helper";



function* onPostCreditCard({ payload: { data, history } }) {
  window.loading(true)
  try {
    const info = {
      paymentAmount: data.idCard === '2' ? data.paymentAmount + ((data.paymentAmount * 10) / 100) : data.paymentAmount + ((data.paymentAmount * 20) / 100) ,
      cardExpiration: data.cardExpiration,
      idCard: Number(data.idCard),
      numberCard: String(data.numberCard),
      verificationCode: String(data.verificationCode),
      cardholder: data.cardholder,
      phoneNumber: String(data.phoneNumber),
      installments: Number(data.installments)
    }

    const response = yield call(postCreditCard, info)

    if(response){
      yield put(postScholarshipSuccess(true))
    }

    window.loading(false)

  } catch (error) {
    yield put(postScholarshipFail(error))
  }
}

function* onGetPaymentsPending() {
  window.loading(true);
  try {
    const response = yield call(getPaymentsPending)
    if(response){
      yield put(getPaymentsPendingSuccess(response))
   }
    window.loading(false);
  } catch (error) {
    yield put(getPaymentsPendingFail(error))
    window.loading(false);
  }
}

function* onGetRejectedCard() {
  window.loading(true);
  try {
    const response = yield call(getRejectedCard)
    //if(response.code === 2){
      //yield put(getPaymentsPendingSuccess(response.absenses))
   // }
    window.loading(false);
  } catch (error) {
    yield put(getPaymentsPendingFail(error))
    window.loading(false);
  }
}




function* CreditCardSaga() {
  yield takeEvery(POST_CREDIT_CARD, onPostCreditCard);
  yield takeEvery(GET_PAYMENTS_PENDING, onGetPaymentsPending);
  yield takeEvery(GET_REJECTED_CARD, onGetRejectedCard);
}

export default CreditCardSaga;
