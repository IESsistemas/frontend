
import {
  GET_LIBRARY,
  GET_LIBRARY_SUCCESS,
  GET_LIBRARY_FAIL,
} from "./actionTypes"

export const getLibrary = id => ({
  type: GET_LIBRARY,
  payload: id
})

export const getLibrarySuccess = library => ({
  type: GET_LIBRARY_SUCCESS,
  payload: library,
});

export const getLibraryFail = error => ({
  type: GET_LIBRARY_FAIL,
  payload: error,
});




