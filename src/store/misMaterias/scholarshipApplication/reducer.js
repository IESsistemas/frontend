import {
  GET_SCHOLARSHIP_SUCCESS,
  GET_SCHOLARSHIP_ERROR,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_ERROR,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR
  /*   POST_APPLY_INTERVIEW,
    PUT_CANCEL_INTERVIEW,
    APPLY_INTERVIEW_SUCCESS,
    CANCEL_INTERVIEW_SUCCESS,
    GET_INTERVIEW_DOA_ERROR */
} from "./actionTypes";

const initialState = {
  scholarship: [],
  company: [],
  data: [],
  errorScholarship: '',
  errorCompany: '',
  errorData: ''
};


const ScholarshipApplication = (state = initialState, action) => {
  switch (action.type) {

    case GET_SCHOLARSHIP_SUCCESS:
      return {
        ...state,
        scholarship: action.payload,
      };
    case GET_SCHOLARSHIP_ERROR:
      return {
        ...state,
        errorScholarship: action.payload,
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.payload,
      };
    case GET_COMPANY_ERROR:
      return {
        ...state,
        errorCompany: action.payload,
      };

      case GET_DATA_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
      case GET_DATA_ERROR:
        return {
          ...state,
          errorData: action.payload,
        };

    /*     case GET_INTERVIEW_DOA_SUCCESS:
          return {
            ...state,
            interview: action.payload,
          };
    
        
        case POST_APPLY_INTERVIEW:
          state = {
            ...state,
            error: false,
          };
        case APPLY_INTERVIEW_SUCCESS:
          state = {
            ...state,
            apply: action.payload
          };
    
        case PUT_CANCEL_INTERVIEW:
          state = {
            ...state,
            error: false,
          };
          break;
        case CANCEL_INTERVIEW_SUCCESS:
          state = {
            ...state,
            cancel: true
          }; */
    default:
      state = { ...state };
      break;

  }
  return state;
};

export default ScholarshipApplication;
