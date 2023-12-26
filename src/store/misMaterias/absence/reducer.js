import {
  GET_ABSENCE_SUCCESS,
  GET_ABSENCE_FAIL,
} from "./actionTypes";

const initialState = {
  absences: [],
  errorMsg: "",
};

const Absence = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABSENCE_SUCCESS:
      return {
        ...state,
        absences: action.payload,
      };
    case GET_ABSENCE_FAIL:
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

export default Absence;
