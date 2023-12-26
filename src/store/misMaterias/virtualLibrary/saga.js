import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_LIBRARY } from "./actionTypes";
import { getLibraryFail, getLibrarySuccess } from "./actions";
import { getVirtualLibrary } from "../../../helpers/iesback_helper";



function* onGetLibrary(payload) {
  window.loading(true);
  try {
    const response = yield call(getVirtualLibrary, payload.payload)
    yield put(getLibrarySuccess(response.virtualLibrary))
    window.loading(false);
  } catch (error) {
    yield put(getLibraryFail(error))
    window.loading(false);
  }
}


function* VirtualLibrarySaga() {
  yield takeEvery(GET_LIBRARY, onGetLibrary);
}

export default VirtualLibrarySaga;
