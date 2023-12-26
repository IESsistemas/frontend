import {
  ACADEMIC_INFO,
  ACADEMIC_INFO_SUCCESS,
  INSCRIPTION_INFO,
  INSCRIPTION_INFO_SUCCESS
} from "./actionTypes";

export const reqPostAcademicInfo = (data) => {
  return {
    type: ACADEMIC_INFO,
    payload: {...data},
  };
}

export const reqPostAcademicInfoSuccess = (data) => {
  return {
    type: ACADEMIC_INFO_SUCCESS,
    payload: {...data},
  };
}

export const reqPostInscriptionInfo = (data) => {
  return {
    type: INSCRIPTION_INFO,
    payload: {...data},
  };
}

export const reqPostInscriptionInfoSuccess = (data) => {
  return {
    type: INSCRIPTION_INFO_SUCCESS,
    payload: {...data},
  };
}