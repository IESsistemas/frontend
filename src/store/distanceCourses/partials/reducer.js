import {
  GET_PARTIAL_SUCCESS,
  GET_PARTIAL_FAIL,
  GET_DOWNLOAD_PARTIAL_SUCCESS,
  GET_DOWNLOAD_PARTIAL_FAIL,
  POST_UPLOAD_PARTIAL_SUCCESS,
  POST_UPLOAD_PARTIAL_FAIL,
  GET_PARTIAL_CIES_SUCCESS,
  GET_PARTIAL_CIES_FAIL,
  GET_DOWNLOAD_PARTIAL_CIES_SUCCESS,
  GET_DOWNLOAD_PARTIAL_CIES_FAIL,
  POST_UPLOAD_PARTIAL_CIES_SUCCESS,
  POST_UPLOAD_PARTIAL_CIES_FAIL
} from "./actionTypes";

const initialState = {
  partials: [],
  errorMsg: "",
  download: false,
  errorUpload: "",
  errorDownload: "",
  Upload: [],
  uploadCies: [],
  errorUploadCies: "",
  partialsCies: [],
  errorMsgCies: "",
};

const Partial = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTIAL_SUCCESS:
      return {
        ...state,
        partials: action.payload,
      };

    case GET_PARTIAL_FAIL:
      return {
        ...state,
        errorMsg: false,
      };

    case GET_DOWNLOAD_PARTIAL_SUCCESS:
      return {
        ...state,
        download: action.payload,
      };

    case GET_DOWNLOAD_PARTIAL_FAIL:
      return {
        ...state,
        errorDownload: false,
      };

    case POST_UPLOAD_PARTIAL_SUCCESS:
      return {
        ...state,
        Upload: action.payload,
      };

    case POST_UPLOAD_PARTIAL_FAIL:
      return {
        ...state,
        errorUpload: false,
      };


    case GET_PARTIAL_CIES_SUCCESS:
      return {
        ...state,
        partialsCies: action.payload,
      };
    case GET_PARTIAL_CIES_FAIL:
      state = {
        ...state,
        errorMsgCies: false,
      };

    case GET_DOWNLOAD_PARTIAL_CIES_SUCCESS:
      return {
        ...state,
        download: action.payload,
      };

    case GET_DOWNLOAD_PARTIAL_CIES_FAIL:
      return {
        ...state,
        errorDownload: false,
      };

    case POST_UPLOAD_PARTIAL_CIES_SUCCESS:
      return {
        ...state,
        uploadCies: action.payload,
      };

    case POST_UPLOAD_PARTIAL_CIES_FAIL:
      return {
        ...state,
        errorUploadCies: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Partial;
