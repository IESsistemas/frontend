import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { GET_FILE_DOCUMENTATION } from "./actionTypes";
import { getFileDocumentationSuccess, getFileDocumentationFail } from "./actions";


import { getFileDocumentation } from "../../helpers/iesback_helper";


function* onGetFileDocumentation(token) {
  try {
    window.loading(true);
    const response = yield call(getFileDocumentation, token.payload)
    yield put(getFileDocumentationSuccess(response))
    window.loading(false);
  } catch (error) {
    yield put(getFileDocumentationFail(error))
  }
}


function* fileDocumentationSaga() {
  yield takeEvery(GET_FILE_DOCUMENTATION, onGetFileDocumentation);
}

export default fileDocumentationSaga;
