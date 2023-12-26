import {
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  PERSONAL_INFO,
  PERSONAL_INFO_SUCCESS,
  PROVINCES,
  PROVINCES_SUCCESS,
  LOCALITIES,
  LOCALITIES_SUCCESS,
  NEIGHBOURS,
  NEIGHBOURS_SUCCESS,
  PROV_LOC_NEI,
  PROV_LOC_NEI_SUCCESS,
  //CLEAN_MODAL,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  ADD_PHONE,
  UPDATE_PHONE,
  DELETE_PHONE,
  CHANGE_PASS,
} from "./actionTypes";

/*export const cleanModal = () => {
  return {
    type: CLEAN_MODAL,
    payload: { },
  };
}*/

export const changeEmail = (email) => {
  return {
    type: CHANGE_EMAIL,
    payload: { email },
  };
};

export const changePass = (data) => {
  return {
    type: CHANGE_PASS,
    payload: { data },
  };
};

export const changeEmailSuccess = (title, text) => {
  return {
    type: CHANGE_EMAIL_SUCCESS,
    payload: { title, text },
  };
}

export const getPersonalInformationAction = () => {
  return {
    type: PERSONAL_INFO,
    payload: { },
  };
}

export const getPersonalInformationActionSuccess = (userEmail, userAddress, counties, phones) => {
  return {
    type: PERSONAL_INFO_SUCCESS,
    payload: {userEmail, userAddress, counties, phones},
  };
}

export const getProvinces = (id) => {
  return {
    type: PROVINCES,
    payload: { id },
  };
}

export const getProvincesSuccess = (provinces) => {
  return {
    type: PROVINCES_SUCCESS,
    payload: {provinces},
  };
}

export const getAllDataAddress = (provinces, localities, neighbours) => {
  return {
    type: PROV_LOC_NEI,
    payload: { provinces, localities, neighbours },
  };
}
export const getAllDataAddressSuccess = (provinces, localities, neighbours) => {
  return {
    type: PROV_LOC_NEI_SUCCESS,
    payload: {provinces, localities, neighbours},
  };
}

export const getLocalities = (id) => {
  return {
    type: LOCALITIES,
    payload: { id },
  };
}

export const getLocalitiesSuccess = (localities) => {
  return {
    type: LOCALITIES_SUCCESS,
    payload: {localities},
  };
}

export const getNeighbours = (id) => {
  return {
    type: NEIGHBOURS,
    payload: { id },
  };
}

export const getNeighboursSuccess = (neighbours) => {
  return {
    type: NEIGHBOURS_SUCCESS,
    payload: {neighbours},
  };
}

export const reqAddAddress = (data) => {
  return {
    type: ADD_ADDRESS,
    payload: { data },
  };
}

export const reqUpdateAddress = (data) => {
  return {
    type: UPDATE_ADDRESS,
    payload: { data },
  };
}

export const reqDeleteAddress = (data) => {
  return {
    type: DELETE_ADDRESS,
    payload: { data },
  };
}

export const reqAddPhone = (data) => {
  return {
    type: ADD_PHONE,
    payload: { data },
  };
}

export const reqUpdatePhone = (data) => {
  return {
    type: UPDATE_PHONE,
    payload: { data },
  };
}

export const reqDeletePhone = (data) => {
  return {
    type: DELETE_PHONE,
    payload: { data },
  };
}