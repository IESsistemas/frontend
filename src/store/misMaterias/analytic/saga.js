import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { ACADEMIC_INFO, INSCRIPTION_INFO } from "./actionTypes";
import { reqPostAcademicInfoSuccess, reqPostInscriptionInfoSuccess } from "./actions";

import { postGetAcademicTranscript, getInscritionData, getInscritionPaymentData } from "../../../helpers/iesback_helper";


function* getAcademicInfoS(data) {
  try {
    if (process.env.REACT_APP_API_URL) {
      window.loading(true);
      let response = yield call(postGetAcademicTranscript, data.payload);
      yield put((reqPostAcademicInfoSuccess(response)));
      window.loading(false);
    }
  } catch (error) {
    console.log(error)
    window.loading(false);
    window.generic.showModal("Error al obtener información", "Ocurrió un error al obtener los datos de analítico. Por favor intente nuevamente más tarde");
  }
}

function* getInscriptionInfoS(data) {
    try {
      if (process.env.REACT_APP_API_URL) {
        window.loading(true);

        let response = yield call(getInscritionData, data.payload.idCareer);
        let responsePayment = yield call(getInscritionPaymentData);
        
        if(response.code == 2 && responsePayment.code == 2){
          yield put((reqPostInscriptionInfoSuccess({
            data: response,
            payment: responsePayment
          })));
        }else if (response.code == 1 && response.statusCode === "VALIDATIONS_FAILED" ) {
          window.generic.showModal("Usted no se encuentra habilitado para realizar la inscripción", response.message);
          yield put((reqPostInscriptionInfoSuccess({
            data: response,
            payment: responsePayment.typesOfPayments ? responsePayment.typesOfPayments : null
          })));
        }else{
          window.generic.showModal("Error al obtener información", "Ocurrió un error al obtener los datos de inscripción. Por favor intente nuevamente más tarde");
        }
        window.loading(false);
      }
    } catch (error) {
      console.log(error)
      window.loading(false);
      window.generic.showModal("Error al obtener información", "Ocurrió un error al obtener los datos de inscripción. Por favor intente nuevamente más tarde");
    }
  }

function* profileSaga() {
  yield takeEvery(ACADEMIC_INFO, getAcademicInfoS);
  yield takeEvery(INSCRIPTION_INFO, getInscriptionInfoS);
}

export default profileSaga;
