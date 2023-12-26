import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_PROMISSORY_NOTE, POST_PROMISSORY_NOTE_CARD, GET_INFO_PROMISSORY_NOTE} from "./actionTypes";
import { getPromissoryNoteSuccess, getPromissoryNoteFail, postPromissoryNoteFail, getInfoPromissoryNoteSuccess } from "./actions";
import { getPromissoryNote, postPromissoryNote,getInfoPromissoryNote  } from "../../../helpers/iesback_helper";

function* onPostPromissoryNote({ payload: { data, history } }) {
  window.loading(true)
  try {
     const info = {
      lastName: data.lastName,
      name: data.name,
      applicantDni: data.applicantDni,
      phone: String(data.phone),
      address: data.address,
      location: data.location,
      promissoryNoteQuantity: data.promissoryNoteQuantity,
    }
    const response = yield call(postPromissoryNote, info)
  if(response){
      history('/ies/materias/imprimir-pagare')
   }

    window.loading(false)

  } catch (error) {
   yield put(postPromissoryNoteFail(error))
  }
}


function* onGetPromissoryNote(payload) {
  window.loading(true);
  try {
    const response = yield call(getPromissoryNote, payload.payload)
    if(response){
      yield put(getPromissoryNoteSuccess(response))
    }
    window.loading(false);
  } catch (error) {
    yield put(getPromissoryNoteFail(error))
    window.loading(false);
  }
}

function* onGetInfoPromissoryNote() {
  window.loading(true);
  try {
    const response = yield call(getInfoPromissoryNote)
    if(response){
      yield put(getInfoPromissoryNoteSuccess(response))
    }
    window.loading(false);
  } catch (error) {
    yield put(getPromissoryNoteFail(error))
    window.loading(false);
  }
}


function* PromissoryNoteSaga() {
  yield takeEvery(GET_PROMISSORY_NOTE, onGetPromissoryNote);
  yield takeEvery(POST_PROMISSORY_NOTE_CARD, onPostPromissoryNote);
  yield takeEvery(GET_INFO_PROMISSORY_NOTE, onGetInfoPromissoryNote);
  
}

export default PromissoryNoteSaga;
