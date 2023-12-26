import {
  GET_FILE_DOCUMENTATION,
  GET_FILE_DOCUMENTATION_SUCCESS,
  GET_FILE_DOCUMENTATION_FAIL,
} from "./actionTypes"

export const getFileDocumentation = (token) => ({
    type: GET_FILE_DOCUMENTATION,
    payload: token
  })

export const getFileDocumentationSuccess = areas => ({
  type: GET_FILE_DOCUMENTATION_SUCCESS,
  payload: areas,
});

export const getFileDocumentationFail = error => ({
  type: GET_FILE_DOCUMENTATION_FAIL,
  payload: error,
});

