import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_ABSENCE } from "./actionTypes";
import { getAbsenceFail, getAbsenceSuccess, getNotAbsenceSuccess } from "./actions";
import { getAbsence } from "../../../helpers/iesback_helper";



function* onGetAbsence(payload) {
  window.loading(true);
  try {
    const response = yield call(getAbsence, payload.payload)
    if(response.code === 2){
      yield put(getAbsenceSuccess(response.absenses))
    }
    window.loading(false);
  } catch (error) {
    yield put(getAbsenceFail(error))
    window.loading(false);
  }
}


function* AbsenceSaga() {
  yield takeEvery(GET_ABSENCE, onGetAbsence);
}

export default AbsenceSaga;
