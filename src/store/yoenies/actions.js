import {
  ACCOUNT_STATMENT,
  ACCOUNT_STATMENT_SUCCESS,
  CERTIFICATE_REQUEST
} from "./actionTypes";

export const reqGetAccountStatment = () => {
  return {
    type: ACCOUNT_STATMENT,
    payload: { },
  };
}

export const reqGetAccountStatmentSuccess = (data) => {
  return {
    type: ACCOUNT_STATMENT_SUCCESS,
    payload: {...data},
  };
}

export const reqPostCertificateRequest = (data) => {
  return {
    type: CERTIFICATE_REQUEST,
    payload: {...data},
  };
}