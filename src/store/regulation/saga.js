import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { POST_REGULATION } from "./actionTypes";
import { getSoftware, getSoftwareSuccess, rqSoftware } from "./actions";
import { postRai } from "../../helpers/iesback_helper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function* sendRegulation({ payload: { data, history } }) {
  window.loading(true);
  try {
    const response = yield call(postRai,
      {
        tipo: "I",
        page: "/ies/regulation"

      });
    if(response.code == 2){
      sessionStorage.setItem('authUser', JSON.stringify(response.newToken));
      window.loading(false);
      toast.success("¡Bien hecho!", { autoClose: 3000 });
      setTimeout(() => {
        window.location.href = "/ies/carrer";
      }, 3000);
    }
    
  } catch (error) {
    console.log(error)
    toast.error("Hubo un error. Intente nuevamente", { autoClose: 3000 });
    window.loading(false);
  }
}


function* softwareSaga() {
  yield takeEvery(POST_REGULATION, sendRegulation);
}

export default softwareSaga;
