import {
  GET_SCHEDULE,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAIL,
} from "./actionTypes";

const initialState = {
  schedule: [],
  errorMsg: "",
};

const academicSchedule = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.payload,
      };

    case GET_SCHEDULE_FAIL:
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

export default academicSchedule;
