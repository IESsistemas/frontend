import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { GET_EXCEPTION, GET_DATA_EXCEPTION, POST_EXCEPTION, GET_COMMISSIONS, GET_EXCEPTION_PROCESSED } from "./actionTypes";
import { getExceptionSuccess, getExceptionFail, getDataConditionalSuccess, getDataListenerSuccess, getDataExceptionFail, postExceptionFail, postExceptionSuccess, getCommissions, getCommissionsSuccess, getCommissionsFail, getExceptionProcessedSuccess, getExceptionProcessedFail, getDataAnotherCareerSuccess } from "./actions";
import { getAcademicExceptionConditional, getAcademicExceptionListener, postExceptionAcademic, getCommission, getAcademicAnotherCareer, getExceptionProcessed } from "../../../helpers/iesback_helper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function* onGetAcademicExceptionApplication({ payload: { data, history } }) {
  window.loading(true)
  try {
    yield put(getExceptionSuccess(data.options))
    window.loading(false)
    if (data.options === '1') {
      history('/ies/materias/academic-exceptions-conditional')
    } else if (data.options === '2') {
      history('/ies/materias/academic-exceptions-listener')
    } else if (data.options === '3') {
      history('/ies/materias/academic-exceptions-another-career')
    }

  } catch (error) {
    yield put(getExceptionFail(error))
  }
}

function* onGetAcademicExceptionData({ payload: { idCareer, option } }) {
  try {
    window.loading(true)

    if (option === '1') {
      const response = yield call(getAcademicExceptionConditional, idCareer)
      yield put(getDataConditionalSuccess(response))
      window.loading(false)
    }

    if (option === '2') {
      const response = yield call(getAcademicExceptionListener, idCareer)
      yield put(getDataListenerSuccess(response))
      window.loading(false)
    }

    if (option === '3') {
      const response = yield call(getAcademicAnotherCareer, idCareer)
      yield put(getDataAnotherCareerSuccess(response))
      window.loading(false)
    }
  } catch (error) {
    yield put(getDataExceptionFail(error))
    window.loading(false)
  }
}

function* onGetCommissions({ payload: { data } }) {
  window.loading(true)
  try {
    const info = JSON.parse(data)
    const params = `commission=${info.Comision}&modality=${info.Id_Modalidad}&careerId=${info.Id_Carrera}&subjectId=${info.Id_Materia}`
    const response = yield call(getCommission, params)

    yield put(getCommissionsSuccess(response))
    window.loading(false)
  } catch (error) {
    yield put(getCommissionsFail(error))
    window.loading(false)
  }
}

function* onGetExceptionProcessed() {
  window.loading(true)
  try {
    const response = yield call(getExceptionProcessed)
    yield put(getExceptionProcessedSuccess(response))
    window.loading(false)
  } catch (error) {
    yield put(getExceptionProcessedFail(error))
    window.loading(false)
  }
}


function* onPostExceptionAcademic({ payload: { data, history } }) {
  window.loading(true)
  try {
    const response = yield call(postExceptionAcademic, data);
    window.loading(false)
    toast.success("Excepción académica solicitada correctamente!", { autoClose: 3000 });
    yield put(postExceptionSuccess(response))
    history('/ies/materias/academic-exceptions')
  } catch (error) {
    toast.error('Hubo un error. Intente nuevamente', { autoClose: 3000 });
    yield put(postExceptionFail(error))
    window.loading(false)
  }
}



function* AcademicExceptionsSaga() {
  yield takeEvery(GET_EXCEPTION, onGetAcademicExceptionApplication);
  yield takeEvery(GET_DATA_EXCEPTION, onGetAcademicExceptionData);
  yield takeEvery(POST_EXCEPTION, onPostExceptionAcademic);
  yield takeEvery(GET_COMMISSIONS, onGetCommissions);
  yield takeEvery(GET_EXCEPTION_PROCESSED, onGetExceptionProcessed);


}

export default AcademicExceptionsSaga;
