
import {
  GET_RAPIPAGO,
  GET_RAPIPAGO_SUCCESS,
  GET_RAPIPAGO_FAIL,
  POST_BARCODE,
  POST_BARCODE_SUCCESS,
  POST_BARCODE_FAIL
} from "./actionTypes"

export const getRapipago = () => ({
  type: GET_RAPIPAGO,
})

export const getRapipagoSuccess = data => ({
  type: GET_RAPIPAGO_SUCCESS,
  payload: data,
});

export const getRapipagoFail = error => ({
  type: GET_RAPIPAGO_FAIL,
  payload: error,
});

export const postBarcode = (data, history) => ({
  type: POST_BARCODE,
  payload: {data, history}
})

export const postBarcodeSuccess = codebar => ({
  type: POST_BARCODE_SUCCESS,
  payload: codebar,
});

export const postBarcodeFail = error => ({
  type: POST_BARCODE_FAIL,
  payload: error,
});




