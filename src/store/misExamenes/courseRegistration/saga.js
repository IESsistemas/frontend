import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_COURSE_REGISTRATION_INFO } from "./actionTypes";
import { getCourseRegistrationInfoFail, getCourseRegistrationInfoSuccess } from "./actions";
import { getCourseRegistrationInfo } from "../../../helpers/iesback_helper";



function* onGetCourseRegistrationInfo(payload) {
  window.loading(true);
  try {

    const response = yield call(getCourseRegistrationInfo, payload.payload)
    yield put(getCourseRegistrationInfoSuccess(response))
    window.loading(false);
  } catch (error) {
    yield put(getCourseRegistrationInfoFail(error))
    window.loading(false);
  }
}


function* CourseRegistrationSaga() {
  yield takeEvery(GET_COURSE_REGISTRATION_INFO, onGetCourseRegistrationInfo);
}

export default CourseRegistrationSaga;
