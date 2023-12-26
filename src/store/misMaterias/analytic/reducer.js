import {
  ACADEMIC_INFO,
  ACADEMIC_INFO_SUCCESS,
  INSCRIPTION_INFO,
  INSCRIPTION_INFO_SUCCESS
} from "./actionTypes";

const initialState = {
  academic: null
};

const switchfun = (state = initialState, action) => {
  switch (action.type) {
    case ACADEMIC_INFO:
      state = {
        ...state,
        academic: null
      };
    break;
    case ACADEMIC_INFO_SUCCESS:
      state = {
        ...state,
        academic: action.payload
      };
    break;
    case INSCRIPTION_INFO:
      state = {
        ...state,
        inscription: null
      };
    break;
    case INSCRIPTION_INFO_SUCCESS:
      state = {
        ...state,
        inscription: action.payload
      };
    break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default switchfun;
