import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { GET_SCHEDULE } from "./actionTypes";
import { getScheduleFail, getScheduleSuccess } from "./actions";

import { getSchedule } from "../../../helpers/iesback_helper";



function* onGetSchedule() {
 
  try {
    window.loading(true);
    const response = yield call(getSchedule)
    yield put(getScheduleSuccess(response.response))
    window.loading(false);
  } catch (error) {
    yield put(getScheduleFail(error))
    window.loading(false);
  }
}


function* AcademicScheduleSaga() {
  yield takeEvery(GET_SCHEDULE, onGetSchedule);
}

export default AcademicScheduleSaga;
