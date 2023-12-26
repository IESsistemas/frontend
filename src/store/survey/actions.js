import {
  GET_SURVEYS,
  GET_SURVEYS_SUCCESS,
  GET_SURVEYS_FAIL,
  GET_SURVEY_QUESTIONS,
  GET_SURVEY_QUESTIONS_SUCCESS,
  POST_ANSWERS
} from "./actionTypes"

export const getSurvey = () => ({
    type: GET_SURVEYS,
  })

export const getSurveySuccess = survey => ({
  type: GET_SURVEYS_SUCCESS,
  payload: survey,
});

export const getSurveyFail = error => ({
  type: GET_SURVEYS_FAIL,
  payload: error,
});


export const getSurveyQuestions = (id , token) => ({
  type: GET_SURVEY_QUESTIONS,
  payload: {id, token}
})

export const getSurveyQuestionSuccess = questions => ({
type: GET_SURVEY_QUESTIONS_SUCCESS,
payload: questions,
});

export const sendAnswers = (data, history) => {
  return {
    type: POST_ANSWERS,
    payload: { data, history },
  };
};
