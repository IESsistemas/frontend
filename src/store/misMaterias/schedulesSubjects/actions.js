
import {
  GET_SCHEDULES_SUBJECTS,
  GET_SCHEDULES_SUBJECTS_SUCCESS,
  GET_SCHEDULES_SUBJECTS_FAIL,
} from "./actionTypes"

export const getSchedulesSubjects = id => ({
  type: GET_SCHEDULES_SUBJECTS,
  payload: id
})

export const getSchedulesSubjectsSuccess = schedules => ({
  type: GET_SCHEDULES_SUBJECTS_SUCCESS,
  payload: schedules,
});

export const getSchedulesSubjectsFail = error => ({
  type: GET_SCHEDULES_SUBJECTS_FAIL,
  payload: error,
});




