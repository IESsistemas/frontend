
import {
  GET_EXAM_MODEL,
  GET_EXAM_MODEL_SUCCESS,
  GET_EXAM_MODEL_FAIL,
  GET_DOWNLOAD_EXAM,
  GET_DOWNLOAD_EXAM_SUCCESS,
  GET_DOWNLOAD_EXAM_FAIL
} from "./actionTypes"

export const getExamModel = () => ({
  type: GET_EXAM_MODEL,
})

export const getExamModelSuccess = exam => ({
  type: GET_EXAM_MODEL_SUCCESS,
  payload: exam,
});

export const getExamModelFail = error => ({
  type: GET_EXAM_MODEL_FAIL,
  payload: error,
});

export const getDownloadExam = (file) => ({
  type: GET_DOWNLOAD_EXAM,
  payload: file
})

export const getDownloadExamSuccess = () => ({
  type: GET_DOWNLOAD_EXAM_SUCCESS,
});

export const getDownloadExamFail = error => ({
  type: GET_DOWNLOAD_EXAM_FAIL,
  payload: error,
});




