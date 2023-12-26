import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess, setCareer } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";

import {
  postLogin,
  getHome,
  getCredentials
} from "../../../helpers/iesback_helper";


import { getArrayPending } from "../../../util/functions";


function* loginUser({ payload: { user, history } }) {
  try {
   if (process.env.REACT_APP_API_URL) {
      window.loading(true)
      //yield put(setGlobalLoading(true));

      const response = yield call(postLogin, {
        dni: user.dni.trim(),
        password: user.password.trim(),
      });

      if (response.statusCode === "SUCCESS") {
        //yield put(loginSuccess(crmApiResponseSuccess));
        sessionStorage.setItem("authUser", JSON.stringify(response.token));
       
        yield put(loginSuccess(response));

        //? obtener información del usuario
        let data = response.data;

        //? obtener información de la carrera
        const responseCarrera = yield call(getHome, response.token);

        //? obtener información de la carrera
        const responseCredentials = yield call(getCredentials, response.token);

        response.data.credentials = responseCredentials.credentialInfo;
        response.data.photo = responseCredentials.photo;
        
        sessionStorage.setItem("authUser", JSON.stringify(response.token));
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        sessionStorage.setItem("homeData", JSON.stringify(responseCarrera));

        const alldata = {
          data: data,
          home: responseCarrera,
          user: response.token,
        };

        let pending = getArrayPending(alldata);
        
        yield put(loginSuccess(alldata));

        sessionStorage.setItem("pendings", JSON.stringify(pending));
        window.loading(false)
        //console.log(alldata)
        if(pending.length === 0){
          if(responseCarrera.careersWithDirectors.length === 1){
            yield put(setCareer(responseCarrera.careersWithDirectors[0]));
            localStorage.setItem('careerSelected', JSON.stringify(responseCarrera.careersWithDirectors[0]))
            history('/ies/mycarrer')
          }else {
            history('/ies/carrer')
          }
        }else{
          switch (pending[0]) {
            case 'suveys': history('/ies/surveys'); break;
            case 'email': history('/ies/auth/disabledemail'); break;
            case 'pass': history('/ies/chpass'); break;
            case 'rules': history('/ies/regulation'); break;
            case 'inhabilitation': history('/ies/auth/disabled'); break;
            default: history('/ies/auth/disabled'); break;
          }
        }
      } else {
        yield put(apiError(response.message));   
        window.loading(false)  
      }
    }
  } catch (error) {
    window.loading(false)
    yield put(apiError(error));
  }
}

//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(LOGOUT_USER, response));
    } else {
      yield put(logoutUserSuccess(LOGOUT_USER, true));
    }
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      if (response) {
        history("/dashboard");
      } else {
        history("/login");
      }
      sessionStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      sessionStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
