import {
  GET_COURSE_REGISTRATION_INFO_SUCCESS,
  GET_COURSE_REGISTRATION_INFO_FAIL,
} from "./actionTypes";

const initialState = {
  courseInfo: [],
  errorMsg: "",
};

const CourseRegistration = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_REGISTRATION_INFO_SUCCESS:
      return {
        ...state,
        courseInfo: action.payload,
      };
    case GET_COURSE_REGISTRATION_INFO_FAIL:
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

export default CourseRegistration;
