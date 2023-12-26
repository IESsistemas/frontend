
import {
  GET_PROMISSORY_NOTE,
  GET_PROMISSORY_NOTE_SUCCESS,
  GET_PROMISSORY_NOTE_FAIL,
  POST_PROMISSORY_NOTE_CARD,
  POST_PROMISSORY_NOTE_SUCCESS,
  POST_PROMISSORY_NOTE_FAIL,
  GET_INFO_PROMISSORY_NOTE,
  GET_INFO_PROMISSORY_NOTE_SUCCESS,
  GET_INFO_PROMISSORY_NOTE_FAIL
} from "./actionTypes"

export const getPromissoryNote = id => ({
  type: GET_PROMISSORY_NOTE,
  payload: id
})

export const getPromissoryNoteSuccess = promissoryNote => ({
  type: GET_PROMISSORY_NOTE_SUCCESS,
  payload: promissoryNote,
});

export const getPromissoryNoteFail = error => ({
  type: GET_PROMISSORY_NOTE_FAIL,
  payload: error,
});

export const postPromissoryNote =  (data, history) => ({
  type: POST_PROMISSORY_NOTE_CARD,
  payload: {data, history}
})

export const postPromissoryNoteSuccess = success => ({
  type: POST_PROMISSORY_NOTE_SUCCESS,
  payload: success,
});

export const postPromissoryNoteFail = error => ({
  type: POST_PROMISSORY_NOTE_FAIL,
  payload: error,
});

export const getInfoPromissoryNote = () => ({
  type: GET_INFO_PROMISSORY_NOTE,
})

export const getInfoPromissoryNoteSuccess = infoPromissoryNote => ({
  type: GET_INFO_PROMISSORY_NOTE_SUCCESS,
  payload: infoPromissoryNote,
});

export const getInfoPromissoryNoteFail = error => ({
  type: GET_INFO_PROMISSORY_NOTE_FAIL,
  payload: error,
});
