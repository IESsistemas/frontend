import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { GET_CHECK_INTERVIEW, GET_INTERVIEW_DOA, POST_APPLY_INTERVIEW, PUT_CANCEL_INTERVIEW } from "./actionTypes";
import { applyInterviewSuccess, cancelInterviewSuccess, getCheckInterviewSuccess, getInterviewDoaError, getInterviewDoaSuccess } from "./actions";
import { getCheckInterview, getInterviewDoa, postApplyInterview, putCancelInterview } from "../../helpers/iesback_helper";


function* onGetCheckInterview() {
  window.loading(true)
  try {
    const response = yield call(getCheckInterview)
    yield put(getCheckInterviewSuccess(response.response))
    window.loading(false)
    yield put(applyInterviewSuccess(false))
  } catch (error) {
    //yield put(getAreasFail(error))
    console.log(error)
  }
}

function* onGetInterviewDoa() {
  window.loading(true)
  try {
    const response = yield call(getInterviewDoa)
    if(response.code === 2){
      yield put(getInterviewDoaSuccess(response.modifiedAvailability))
    }
    if(response.code === 1){
      yield put(getInterviewDoaError(true))
    }
    window.loading(false)
  } catch (error) {
    //yield put(getAreasFail(error))
    console.log(error)
    window.loading(false)
  }
}
function* applyInterview({ payload: { data, history } }) {
  window.loading(true)
  try {
    const values = JSON.parse(data.hour)
    const response = yield call(postApplyInterview,
      {
        tipoDoc: String(values.tipo_doc),
        numDoc: values.num_doc,
        fecha: values.fecha,
        hora: values.hora,
        tipoEntrevista: data.type
      });
    window.loading(false)
    if (response.statusCode === "VALIDATIONS_FAILED") {
      yield put(applyInterviewSuccess(true))
    }

    if (response.statusCode === 'SUCCESS') {
      yield call(onGetCheckInterview);
    }

    //
  } catch (error) {
    console.log(error)
    window.loading(false)
  }
}

function* onCancelInterview({ payload: { data, history } }) {
  window.loading(true)
  try {
    yield call(putCancelInterview,
      {
        fecha: data.fecha,
        hora: data.hora,
      });
    window.loading(false)
    yield put(cancelInterviewSuccess(true))
    yield call(onGetCheckInterview);


  } catch (error) {
    console.log(error)
    window.loading(false)
  }
}


function* doaSaga() {
  yield takeEvery(GET_CHECK_INTERVIEW, onGetCheckInterview);
  yield takeEvery(GET_INTERVIEW_DOA, onGetInterviewDoa);
  yield takeEvery(POST_APPLY_INTERVIEW, applyInterview);
  yield takeEvery(PUT_CANCEL_INTERVIEW, onCancelInterview);

}

export default doaSaga;
