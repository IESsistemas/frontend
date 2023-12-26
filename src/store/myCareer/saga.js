import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_MESSAGES } from "./actionTypes";
import { getMessagesSuccess, getMessagesFail } from "./actions";
import { getMessages } from "../../helpers/iesback_helper";



function* onGetMessages() {
  window.loading(true);
  try {
    const response = yield call(getMessages)
    yield put(getMessagesSuccess(response))
    window.loading(false);
  } catch (error) {
/*     yield put(getMessagesFail(error)) */
    window.loading(false);
  }
}


function* MyCareerSaga() {
  yield takeEvery(GET_MESSAGES, onGetMessages);
}

export default MyCareerSaga;
