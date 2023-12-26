import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_EXAM_MODEL, GET_DOWNLOAD_EXAM } from "./actionTypes";
import { getExamModelSuccess, getExamModelFail, getDownloadExamSuccess, getDownloadExamFail} from "./actions";
import { getExamModels, getDownloadExam } from "../../../helpers/iesback_helper";



function* onGetExamModels() {
  window.loading(true);
  try {

    const response = yield call(getExamModels)
    yield put(getExamModelSuccess(response))
    window.loading(false);
  } catch (error) {
    yield put(getExamModelFail(error))
    window.loading(false);
  }
}

function* onGetDownloadExam(payload) {
  window.loading(true);
  try {
    const response = yield call(getDownloadExam, payload.payload)
    window.open(response.urlToDownload, '_blank');
    //yield put(getDownloadExamSuccess(response.urlToDownload))
    window.loading(false);
  } catch (error) {
    yield put(getDownloadExamFail(error))
    window.loading(false);
  }
}


function* ExamModelsSaga() {
  yield takeEvery(GET_EXAM_MODEL, onGetExamModels);
  yield takeEvery(GET_DOWNLOAD_EXAM, onGetDownloadExam);
}

export default ExamModelsSaga;
