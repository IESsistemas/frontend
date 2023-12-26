
import {
  GET_SCHEDULE,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAIL,
} from "./actionTypes"

export const getSchedule = () => ({
  type: GET_SCHEDULE,
})

export const getScheduleSuccess = schedule => ({
  type: GET_SCHEDULE_SUCCESS,
  payload: schedule,
});

export const getScheduleFail = error => ({
  type: GET_SCHEDULE_FAIL,
  payload: error,
});




