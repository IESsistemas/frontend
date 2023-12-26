import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { GET_SCHOLARSHIP, GET_COMPANY, GET_DATA } from "./actionTypes";
import { getScholarshipSuccess, getScholarshipFail, getCompanySuccess, getCompanyFail, getDataSuccess, getDataFail} from "./actions";
import { getScholarshipData } from "../../../helpers/iesback_helper";


function* onGetScholarshipApplication({ payload: { data, history } }) {
  window.loading(true)
  try {
    yield put(getScholarshipSuccess(data.beca))
    window.loading(false)
    history('/ies/materias/documentacion-beca')
  } catch (error) {
    yield put(getScholarshipFail(error))
    console.log(error)
  }
}

function* onGetCompanyName({ payload: { data, history } }) {
  window.loading(true)
  try {
    yield put(getCompanySuccess(data.information))
    window.loading(false)
    history({
      pathname: '/ies/materias/documentacion-print',
      target: '_blank'
    })
  } catch (error) {
    yield put(getCompanyFail(error))
    console.log(error)
  }
}

function* onGetScholarshipData(payload) {
  try {
    window.loading(true)
    const response = yield call(getScholarshipData, payload.payload)
    yield put(getDataSuccess(response.response))
    if(response.statusCode === "SUCCESS"){
      window.loading(false)
    }
  } catch (error) {
    yield put(getDataFail(error))
    window.loading(false)
  }
}



function* scholarshipApplicationSaga() {
  yield takeEvery(GET_SCHOLARSHIP, onGetScholarshipApplication);
  yield takeEvery(GET_COMPANY, onGetCompanyName);
  yield takeEvery(GET_DATA, onGetScholarshipData);

}

export default scholarshipApplicationSaga;
