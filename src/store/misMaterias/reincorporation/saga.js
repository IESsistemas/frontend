import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_REINCORPORATION, POST_REINCORPORATION } from "./actionTypes";
import { getReincorporationFail, getReincorporationSuccess } from "./actions";
import { getReincorporation, sendReincorporation } from "../../../helpers/iesback_helper";



function* onGetReincorporation(payload) {
  window.loading(true);
  try {
    const response = yield call(getReincorporation, payload.idCarrera === NaN ? Number(payload.idCarrera) : payload.idCarrera)
    if (response.code === 2) {
      yield put(getReincorporationSuccess(response.statusAbsenses))
    }
    window.loading(false);
  } catch (error) {
    yield put(getReincorporationFail(error))
    window.loading(false);
  }
}


function* reincorporation(payload) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      const response = yield call(sendReincorporation, payload.payload)
      if (response.statusCode === 'SUCCESS') {
        yield call(onGetReincorporation, payload.payload);
      }
      window.loading(false);
    }
  } catch (error) {
    window.loading(false);
    //yield put(suggestionApiError(error));  
  }

}

function* ReincorporationSaga() {
  yield takeEvery(GET_REINCORPORATION, onGetReincorporation);
  yield takeEvery(POST_REINCORPORATION, reincorporation);
}

export default ReincorporationSaga;
