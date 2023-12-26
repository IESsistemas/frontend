
import {
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
} from "./actionTypes"

export const getMessages = () => ({
  type: GET_MESSAGES,
})

export const getMessagesSuccess = messages => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
});

export const getMessagesFail = error => ({
  type: GET_MESSAGES_FAIL,
  payload: error,
});

