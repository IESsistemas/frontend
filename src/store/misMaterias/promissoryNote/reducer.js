import {
  GET_PROMISSORY_NOTE_SUCCESS,
  GET_PROMISSORY_NOTE_FAIL,
  POST_PROMISSORY_NOTE_SUCCESS,
  POST_PROMISSORY_NOTE_FAIL,
  GET_INFO_PROMISSORY_NOTE_SUCCESS,
  GET_INFO_PROMISSORY_NOTE_FAIL
} from "./actionTypes";

const initialState = {
  promissoryNote: [],
  errorMsg: "",
  success: "",
  errorMsgPost: "",
  infoPromissoryNote:[],
  errorMsgInfo: ""

};

const PromissoryNote = (state = initialState, action) => {
  switch (action.type) {
    case POST_PROMISSORY_NOTE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case POST_PROMISSORY_NOTE_FAIL:
      return {
        ...state,
        errorMsgPost: false,
      };
      case GET_INFO_PROMISSORY_NOTE_SUCCESS:
      return {
        ...state,
        infoPromissoryNote: action.payload,
      };
    case GET_INFO_PROMISSORY_NOTE_FAIL:
      return {
        ...state,
        errorMsgInfo: false,
      };
    case GET_PROMISSORY_NOTE_SUCCESS:
      return {
        ...state,
        promissoryNote: action.payload,
      };
    case GET_PROMISSORY_NOTE_FAIL:
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

export default PromissoryNote;
