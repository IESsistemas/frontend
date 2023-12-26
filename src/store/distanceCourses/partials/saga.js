import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_PARTIAL, GET_PARTIAL_CIES, GET_DOWNLOAD_PARTIAL, POST_UPLOAD_PARTIAL, GET_DOWNLOAD_PARTIAL_CIES, POST_UPLOAD_PARTIAL_CIES } from "./actionTypes";
import { getPartialFail, getPartialSuccess, getNotPartialSuccess, getPartialCiesSuccess, getDownloadPartialFail, getDownloadPartialSuccess } from "./actions";
import { getPartial, getPartialCies, getPartialDownload, postPartialUpload, postPartialUploadCies, postPartialCiesDownload } from "../../../helpers/iesback_helper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function* onGetPartial() {
  window.loading(true);
  try {
    const response = yield call(getPartial)
    console.log('response', response)
    yield put(getPartialSuccess(response))
    window.loading(false);
  } catch (error) {
    yield put(getPartialFail(error))
    window.loading(false);
  }
}

function* onGetPartialCies(payload) {
  window.loading(true);
  try {
    const response = yield call(getPartialCies, payload.idCareer)
    yield put(getPartialCiesSuccess(response))
    window.loading(false);
  } catch (error) {
    yield put(getPartialFail(error))
    window.loading(false);
  }
}

function* onGetDownload(payload) {
  window.loading(true);
  try {
    const response = yield call(getPartialDownload, payload.payload)
    console.log(response)
    window.open(response.urlToDownload, '_blank');
    yield put(getDownloadPartialSuccess(true))
    window.loading(false);
    toast.success("Se descargo el archivo correctamente", { autoClose: 3000 });

   
  } catch (error) {
    yield put(getDownloadPartialFail(error))
    window.loading(false);
    toast.error('Hubo un error. Intente nuevamente.', { autoClose: 3000 });
  }
}

function* onPostUpload(payload) {
  window.loading(true);
  try {
    const data = {
      file: payload.payload
    }
    const response = yield call(postPartialUpload, payload.payload)
    window.loading(false);
    toast.success("Se cargo el archivo correctamente", { autoClose: 3000 });
    
  } catch (error) {
    yield put(getDownloadPartialFail(error))
    window.loading(false);
    toast.error('Hubo un error. Intente nuevamente.', { autoClose: 3000 });
  }
}

function* onGetDownloadCies(payload) {
  window.loading(true);
  try {
    const data = {
      idModelo: payload.payload.modelo,
      idMesa: payload.payload.mesa,
      idCarrera: payload.payload.career
    } 
    const response = yield call(postPartialCiesDownload, data)
    console.log('RESPONSE',response)
    window.open(response.downloadRoute, '_blank');
    toast.success("Se descargo el archivo correctamente", { autoClose: 3000 });
    window.loading(false);
  } catch (error) {
    yield put(getDownloadPartialFail(error))
    window.loading(false);
    toast.error('Hubo un error. Intente nuevamente.', { autoClose: 3000 });
  }
}

function* onPostUploadCies(payload) {
  window.loading(true);
  try {
    const info = `${payload.payload.modelo}/${payload.payload.mesa}/${payload.payload.career}`
    const data = {
      file: payload.payload.file
    }

   const response = yield call(postPartialUploadCies, info, data)
    window.loading(false);
    toast.success("Se cargo el archivo correctamente", { autoClose: 3000 });
  } catch (error) {
    yield put(getDownloadPartialFail(error))
    window.loading(false);
    toast.error('Hubo un error. Intente nuevamente.', { autoClose: 3000 });
  }
}


function* PartialSaga() {
  yield takeEvery(GET_PARTIAL, onGetPartial);
  yield takeEvery(GET_PARTIAL_CIES, onGetPartialCies);
  yield takeEvery(GET_DOWNLOAD_PARTIAL, onGetDownload);
  yield takeEvery(POST_UPLOAD_PARTIAL, onPostUpload);
  yield takeEvery(GET_DOWNLOAD_PARTIAL_CIES, onGetDownloadCies);
  yield takeEvery(POST_UPLOAD_PARTIAL_CIES, onPostUploadCies);
  
}

export default PartialSaga;
