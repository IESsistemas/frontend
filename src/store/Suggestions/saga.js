import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { GET_AREAS, POST_SUGGESTIONS } from "./actionTypes";
import { getAreasSuccess, getAreasFail, suggestionApiError } from "./actions";

import { getAreas, sendSuggestions } from "../../helpers/iesback_helper";



function* onGetAreas() {
  try {
    const response = yield call(getAreas)
    yield put(getAreasSuccess(response))
  } catch (error) {
    yield put(getAreasFail(error))
  }
}

function* suggestions({ payload: { data, history } }) {
  try {
    if (process.env.REACT_APP_API_URL) {
      const area = JSON.parse(data.area)
      window.loading(true);
      const response = yield call(sendSuggestions, {
        dni: String(data.dni),
        idArea: String(area.Id_area),
        descriptionArea: area.Descripcion,
        emailArea: area.Mail_responsable,
        subject: 'Reclamos o sugerencias',
        message: data.message,
        page: "/ies/suggestion"
      })
      window.loading(false);
      if (response.statusCode === "SUCCESS") {
      history('/ies/suggestions/success');
      }else {
        yield put(suggestionApiError(response.message));     
      }
      //yield put(getAreasSuccess(response))
    }
  } catch (error) {
    console.log(error)
    yield put(suggestionApiError(error));  
  }

}

function* suggestionsSaga() {
  yield takeEvery(GET_AREAS, onGetAreas);
  yield takeEvery(POST_SUGGESTIONS, suggestions);
}

export default suggestionsSaga;
