import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { ACCOUNT_STATMENT, CERTIFICATE_REQUEST } from "./actionTypes";
import { reqGetAccountStatmentSuccess } from "./actions";

import { getAccountStatus, postCertificateRequest } from "../../helpers/iesback_helper";


function* getAccountStatusInfo() {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      let response = yield call(getAccountStatus, {});
      if(response.code == 2){
        response = response.response;
        let toAppend = [];
        let ss = 0;
        for (let i = 0; i < response.ultMovSaldoInicial.length; i++) {
          toAppend.push({
            tipo_saldo: "A",
            descripcion: "Saldo inicial",
            fecha: response.ultMovSaldoInicial[i].fecha,
            importe: response.ultMovSaldoInicial[i].saldo,
            saldo: response.ultMovSaldoInicial[i].saldo,
          })
          ss+= response.ultMovSaldoInicial[i].saldo;
        }
        for (let i = 0; i < response.ultimosMovimientos.length; i++) {
          let val = (response.ultimosMovimientos[i].tipo_saldo.indexOf('D') !== -1 ? -1:1)*response.ultimosMovimientos[i].importe;
          response.ultimosMovimientos[i].saldo = (i>0 ? (response.ultimosMovimientos[i-1].saldo+val):(val+ss));
        }

        response.ultimosMovimientos.sort((a, b) => a.fecha - b.fecha)

        yield put((reqGetAccountStatmentSuccess({
          saldo: response.consultaSaldo,
          movimientos: [...toAppend, ...response.ultimosMovimientos].reverse(),
          vencimientos: response.pagares,
          cupon: response.cupones ? (
            response.cupones[0] ? (
              response.cupones[0].CUPON ? response.cupones[0].CUPON:0
            ):0
          ):0
        })));
      }else{
        window.generic.showModal("Error al obtener información", "Ocurrió un error al obtener los datos de la cuenta. Por favor intente nuevamente más tarde");
      }
      window.loading(false);
    }
  } catch (error) {
    console.log(error)
    window.loading(false);
    window.generic.showModal("Error al obtener información", "Ocurrió un error al obtener los datos de la cuenta. Por favor intente nuevamente más tarde");
  }
}

function* postSendRqCertificate(data) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      let response = yield call(postCertificateRequest, data.payload);
      if(response.code == 2){
        response = response.response;
        window.generic.showModal("Certificado solicitado", "Se realizo la solicitud del certificado correctamente. El certificado solicitado se enviará por correo electrónico");
      }else{
        window.generic.showModal("Error al obtener información", "Ocurrió un error al obtener los datos de la cuenta. Por favor intente nuevamente más tarde");
      }
      window.loading(false);
    }
  } catch (error) {
    console.log(error)
    window.loading(false);
    window.generic.showModal("Error al obtener información", "Ocurrió un error al obtener los datos de la cuenta. Por favor intente nuevamente más tarde");
  }
}

function* profileSaga() {
  yield takeEvery(ACCOUNT_STATMENT, getAccountStatusInfo);
  yield takeEvery(CERTIFICATE_REQUEST, postSendRqCertificate);
}

export default profileSaga;
