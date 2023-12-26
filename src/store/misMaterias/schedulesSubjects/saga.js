import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_SCHEDULES_SUBJECTS } from "./actionTypes";
import { getSchedulesSubjectsSuccess, getSchedulesSubjectsFail } from "./actions";
import { getScheduleSubjects } from "../../../helpers/iesback_helper";



function* onGetScheduleSubjects(payload) {
  window.loading(true);
  try {
    const response = yield call(getScheduleSubjects, payload.payload)
    if(response.code === 2){
     yield put(getSchedulesSubjectsSuccess(response.groupedDays))
    }
    window.loading(false);
  } catch (error) {
    yield put(getSchedulesSubjectsFail(error))
    window.loading(false);
  }
}


function* AbsenceSaga() {
  yield takeEvery(GET_SCHEDULES_SUBJECTS, onGetScheduleSubjects);
}

export default AbsenceSaga;
