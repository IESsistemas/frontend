import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { GET_SURVEYS, GET_SURVEY_QUESTIONS, POST_ANSWERS } from "./actionTypes";
import { getSurveySuccess, getSurveyFail, getSurveyQuestionSuccess } from "./actions";


import { getSurveys,getSurveysQuestions, sendAnswers } from "../../helpers/iesback_helper";


function* onGetSurveys() {
  window.loading(true)
  try {
    const response = yield call(getSurveys)
    yield put(getSurveySuccess(response.userPendingSurveys))
    window.loading(false)
  } catch (error) {
    yield put(getSurveyFail(error))
    window.loading(false)
  }
}

function* onGetSurveysQuestions({payload: {id, token}}) {
 
  try {
    window.loading(true)
    const response = yield call(getSurveysQuestions, id, token)
    yield put(getSurveyQuestionSuccess(response.userPendingSurveys))
    // if(response.statusCode === "SUCCESS"){
    //   window.loading(false)
    // }
    window.loading(false)
  } catch (error) {
    yield put(getSurveyFail(error))
    window.loading(false)
  }
}

function* onSendAnswers({ payload: { data, history } }) {
  window.loading(true);
  try {
    if (process.env.REACT_APP_API_URL) {
      const response = yield call(sendAnswers, data)
      window.loading(false);
      history('/ies/survey/success');
    }
  } catch (error) {
    console.log(error)
    window.loading(false);
  }
}



function* surveySaga() {
  yield takeEvery(GET_SURVEYS, onGetSurveys);
  yield takeEvery(GET_SURVEY_QUESTIONS, onGetSurveysQuestions);
  yield takeEvery(POST_ANSWERS, onSendAnswers);
}

export default surveySaga;
