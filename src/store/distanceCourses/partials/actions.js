
import {
  GET_PARTIAL,
  GET_PARTIAL_SUCCESS,
  GET_PARTIAL_FAIL,
  GET_DOWNLOAD_PARTIAL,
  GET_DOWNLOAD_PARTIAL_SUCCESS,
  GET_DOWNLOAD_PARTIAL_FAIL,
  POST_UPLOAD_PARTIAL,
  POST_UPLOAD_PARTIAL_SUCCESS,
  POST_UPLOAD_PARTIAL_FAIL,
  GET_PARTIAL_CIES,
  GET_PARTIAL_CIES_SUCCESS,
  GET_PARTIAL_CIES_FAIL,
  GET_DOWNLOAD_PARTIAL_CIES,
  GET_DOWNLOAD_PARTIAL_CIES_SUCCESS,
  GET_DOWNLOAD_PARTIAL_CIES_FAIL,
  POST_UPLOAD_PARTIAL_CIES,
  POST_UPLOAD_PARTIAL_CIES_SUCCESS,
  POST_UPLOAD_PARTIAL_CIES_FAIL,
} from "./actionTypes"

export const getPartial = () => ({
  type: GET_PARTIAL,
})

export const getPartialSuccess = partial => ({
  type: GET_PARTIAL_SUCCESS,
  payload: partial,
});
export const getPartialFail = error => ({
  type: GET_PARTIAL_FAIL,
  payload: error,
});

export const getDownloadPartial = download => ({
  type: GET_DOWNLOAD_PARTIAL,
  payload: download,
})

export const getDownloadPartialSuccess = download => ({
  type: GET_DOWNLOAD_PARTIAL_SUCCESS,
  payload: download,
});
export const getDownloadPartialFail = error => ({
  type: GET_DOWNLOAD_PARTIAL_FAIL,
  payload: error,
});

export const getUploadPartial = upload => ({
  type: POST_UPLOAD_PARTIAL,
  payload: upload,
})

export const getUploadPartialSuccess = upload => ({
  type: POST_UPLOAD_PARTIAL_SUCCESS,
  payload: upload,
});
export const getUploadPartialFail = error => ({
  type: POST_UPLOAD_PARTIAL_FAIL,
  payload: error,
});



export const getPartialCies = id => ({
  type: GET_PARTIAL_CIES,
  idCareer: id
})

export const getPartialCiesSuccess = exam => ({
  type: GET_PARTIAL_CIES_SUCCESS,
  payload: exam,
});
export const getPartialCiesFail = error => ({
  type: GET_PARTIAL_CIES_FAIL,
  payload: error,
});

export const getDownloadPartialCies = (modelo, mesa, career) => ({
  type: GET_DOWNLOAD_PARTIAL_CIES,
  payload: {modelo, mesa, career},
})

export const getDownloadPartialCiesSuccess = download => ({
  type: GET_DOWNLOAD_PARTIAL_CIES_SUCCESS,
  payload: download,
});
export const getDownloadPartialCiesFail = error => ({
  type: GET_DOWNLOAD_PARTIAL_CIES_FAIL,
  payload: error,
});

export const getUploadPartialCies = (modelo, mesa, career, file) => ({
  type: POST_UPLOAD_PARTIAL_CIES,
  payload: {modelo, mesa, career, file},
})

export const getUploadPartialCiesSuccess = upload => ({
  type: POST_UPLOAD_PARTIAL_CIES_SUCCESS,
  payload: upload,
});
export const getUploadPartialCiesFail = error => ({
  type: POST_UPLOAD_PARTIAL_CIES_FAIL,
  payload: error,
});

