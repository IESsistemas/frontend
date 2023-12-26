import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { SET_LOADING, SET_GLOBAL_LOADING } from "./actionTypes";

function* setLoadingSaga(action) {
  // Realiza cualquier lógica adicional aquí, si es necesario
  yield put({ type: SET_LOADING, payload: action.payload });
}

function* setGlobalLoadingSaga(action) {
  yield put(setLoadingSaga(action.payload));
}

function* globalSagas() {
  yield takeEvery(SET_LOADING, setLoadingSaga);
  yield takeLatest(SET_GLOBAL_LOADING, setGlobalLoadingSaga);
}

export default globalSagas;
