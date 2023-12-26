import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes";
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeForgetPwd,
  postJwtForgetPwd,
} from "../../../helpers/fakebackend_helper";
import { postForgetPwd } from "../../../helpers/iesback_helper";

//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################
//? #############                     IES SERVICES                         ####################
//? ###########################################################################################

function* userForgetPassword({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_API_URL) {
      const response = yield call(postForgetPwd, user);
      if (response) {
        history('/ies/forgot-password/success')
      }
    }

  } catch (error) {
    console.log('Error:', error);
    yield put(userForgetPasswordError('Por favor, ingrese un DNI válido'));
  }
}


//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################
//? ###########################################################################################

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, userForgetPassword);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
