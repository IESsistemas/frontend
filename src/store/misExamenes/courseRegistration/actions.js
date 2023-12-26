
import {
  GET_COURSE_REGISTRATION_INFO,
  GET_COURSE_REGISTRATION_INFO_SUCCESS,
  GET_COURSE_REGISTRATION_INFO_FAIL,
} from "./actionTypes"

export const getCourseRegistrationInfo = id => ({
  type: GET_COURSE_REGISTRATION_INFO,
  payload: id
})

export const getCourseRegistrationInfoSuccess = info => ({
  type: GET_COURSE_REGISTRATION_INFO_SUCCESS,
  payload: info,
});

export const getCourseRegistrationInfoFail = error => ({
  type: GET_COURSE_REGISTRATION_INFO_FAIL,
  payload: error,
});




