import {
  GET_SCHEDULES_SUBJECTS_SUCCESS,
  GET_SCHEDULES_SUBJECTS_FAIL,
} from "./actionTypes";

const initialState = {
  schedules: [],
  errorMsg: "",
};

const SchedulesSubjects = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULES_SUBJECTS_SUCCESS:
      return {
        ...state,
        schedules: action.payload,
      };
    case GET_SCHEDULES_SUBJECTS_FAIL:
      state = {
        ...state,
        errorMsg: false,
      };
      break;
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default SchedulesSubjects;
