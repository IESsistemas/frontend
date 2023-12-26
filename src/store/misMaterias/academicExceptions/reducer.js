import {
  GET_EXCEPTION_SUCCESS,
  GET_EXCEPTION_ERROR,
  GET_DATA_CONDITIONAL_SUCCESS,
  GET_DATA_LISTENER_SUCCESS,
  GET_DATA_EXCEPTION_ERROR,
  POST_EXCEPTION_SUCCESS,
  POST_EXCEPTION_ERROR,
  GET_COMMISSIONS_SUCCESS,
  GET_COMMISSIONS_ERROR,
  GET_EXCEPTION_PROCESSED_SUCCESS,
  GET_EXCEPTION_PROCESSED_ERROR,
  GET_DATA_ANOTHER_CAREER_SUCCESS
} from "./actionTypes";

const initialState = {
  exception: '',
  conditional: [],
  listener: [],
  errorException: '',
  errorDataException: '',
  dataSuccess: '',
  errorPostException: '',
  commissions: [],
  errorCommissions: '',
  exceptionProcessed: [],
  errorProcessed: '',
  anotherCareer: [],
};


const AcademicExceptions = (state = initialState, action) => {
  switch (action.type) {

    case GET_EXCEPTION_SUCCESS:
      return {
        ...state,
        exception: action.payload,
      };
    case GET_EXCEPTION_ERROR:
      return {
        ...state,
        errorException: action.payload,
      };
    case GET_DATA_CONDITIONAL_SUCCESS:
      return {
        ...state,
        conditional: action.payload,
      };
    case GET_DATA_LISTENER_SUCCESS:
      return {
        ...state,
        listener: action.payload,
      };
    case GET_DATA_EXCEPTION_ERROR:
      return {
        ...state,
        errorDataException: action.payload,
      };
      case GET_DATA_ANOTHER_CAREER_SUCCESS:
      return {
        ...state,
        anotherCareer: action.payload,
      };
    case POST_EXCEPTION_SUCCESS:
      return {
        ...state,
        dataSuccess: action.payload,
      };
    case POST_EXCEPTION_ERROR:
      return {
        ...state,
        errorPostException: action.payload,
      };

    case GET_COMMISSIONS_SUCCESS:
      return {
        ...state,
        commissions: action.payload,
      };


    case GET_COMMISSIONS_ERROR:
      return {
        ...state,
        errorCommissions: false,
      };

    case GET_EXCEPTION_PROCESSED_SUCCESS:
      return {
        ...state,
        exceptionProcessed: action.payload,
      };


    case GET_EXCEPTION_PROCESSED_ERROR:
      return {
        ...state,
        errorProcessed: false,
      };

    default:
      state = { ...state };
      break;

  }
  return state;
};

export default AcademicExceptions;
