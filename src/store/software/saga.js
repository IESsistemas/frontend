import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { POST_REQUIREMENT, GET_SOFTWARE, POST_SOFTWARE } from "./actionTypes";
import { getSoftwareSuccess, rqSoftware } from "./actions";
import { addRequestSoftware, getSoftware } from "../../helpers/iesback_helper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function* sendRqSoftware({ payload: { data, history } }) {
  try {
    history('/ies/rq-form-software');
  } catch (error) {
    console.log(error)
  }
}

function* onGetSoftware() {
  window.loading(true)
  try {
    const response = yield call(getSoftware)
    yield put(getSoftwareSuccess(response.userRequestSofware))
    window.loading(false)
  } catch (error) {
    window.loading(false)
    //yield put(getAreasFail(error))
  }
}

function* onAddRequestSoftware({ payload: { data, history } }) {
  window.loading(true)
  try {
    if (process.env.REACT_APP_API_URL) {
      const response = yield call(addRequestSoftware, {
        toEmail: "laboratorios@ies21.com.ar",
        fromEmail: "sistemas@ies21.com.ar",
        nameFrom: "Web Alumnos",
        subject: "SOLICITUD DE SOFTWARE",
        message: data.message ? data.message : "SOLICITUD DE SOFTWARE",
        salida: data.salida === "N" ? "N" : "S"
      })

        
        window.loading(false)

        toast.success(response.message, { autoClose: 3000 });
        setTimeout(() => {
          history('/ies/mycarrer');
        }, 3000);
    }
  } catch (error) {
    window.loading(false)
    console.log(error)
    toast.error('Hubo un error. Intente nuevamente', { autoClose: 3000 });
  }

}

function* softwareSaga() {
  yield takeEvery(POST_REQUIREMENT, sendRqSoftware);
  yield takeEvery(GET_SOFTWARE, onGetSoftware);
  yield takeEvery(POST_SOFTWARE, onAddRequestSoftware)

  
}

export default softwareSaga;
