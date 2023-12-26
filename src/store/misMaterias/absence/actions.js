
import {
  GET_ABSENCE,
  GET_ABSENCE_SUCCESS,
  GET_ABSENCE_FAIL,
} from "./actionTypes"

export const getAbsence = id => ({
  type: GET_ABSENCE,
  payload: id
})

export const getAbsenceSuccess = library => ({
  type: GET_ABSENCE_SUCCESS,
  payload: library,
});

export const getAbsenceFail = error => ({
  type: GET_ABSENCE_FAIL,
  payload: error,
});




