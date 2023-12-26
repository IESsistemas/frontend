import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_CHECK_SERVE } from "./actionTypes";
import { getCheckServerSuccess, getCheckServerFail} from "./actions";
import { getCheckServer } from "../../../helpers/iesback_helper";



function* onGetCheckServer() {
  window.loading(true);
  try {
    const response = yield call(getCheckServer)
    if(response.code === 1){
      yield put(getCheckServerSuccess(false))
    }else if(response.code === 2){
      yield put(getCheckServerSuccess(true))
    }
  
    window.loading(false);
  } catch (error) {
    yield put(getCheckServerFail(error))
    window.loading(false);
  }
}

function* CheckServeSaga() {
  yield takeEvery(GET_CHECK_SERVE, onGetCheckServer);

}

export default CheckServeSaga;
