import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_RAPIPAGO, POST_BARCODE} from "./actionTypes";
import { getRapipagoFail, getRapipagoSuccess, postBarcodeSuccess, postBarcodeFail } from "./actions";
import { getRapipago, postBarcode} from "../../../helpers/iesback_helper";



function* onGetRapipago() {
  window.loading(true);
  try {
    const response = yield call(getRapipago)
    yield put(getRapipagoSuccess(response))
    window.loading(false);
  } catch (error) {
    yield put(getRapipagoFail(error))
    window.loading(false);
  }
}

function* onPostBarcode({ payload: { data, history } }) {
  window.loading(true);
  try {
    const response = yield call(postBarcode)
    yield put(postBarcodeSuccess(response))

    history('/ies/materias/imprimir-boleta-pago');
    window.loading(false);
  } catch (error) {
    yield put(postBarcodeFail(error))
    window.loading(false);
  }
}



function* RapipagoSaga() {
  yield takeEvery(GET_RAPIPAGO, onGetRapipago);
  yield takeEvery(POST_BARCODE, onPostBarcode);
  
}

export default RapipagoSaga;
