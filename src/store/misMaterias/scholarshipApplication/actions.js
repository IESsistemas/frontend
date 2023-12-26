import {
  GET_SCHOLARSHIP,
  GET_SCHOLARSHIP_SUCCESS,
  GET_SCHOLARSHIP_ERROR,
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_ERROR,
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR

} from "./actionTypes"

export const getScholarship =  (data, history) => ({
  type: GET_SCHOLARSHIP,
  payload: {data, history}
})

export const getScholarshipSuccess = scholarship => ({
  type: GET_SCHOLARSHIP_SUCCESS,
  payload: scholarship,
});

export const getScholarshipFail = error => ({
  type: GET_SCHOLARSHIP_ERROR,
  payload: error,
});

export const getCompany =  (data, history) => ({
  type: GET_COMPANY,
  payload: {data, history}
})

export const getCompanySuccess = scholarship => ({
  type: GET_COMPANY_SUCCESS,
  payload: scholarship,
});

export const getCompanyFail = error => ({
  type: GET_COMPANY_ERROR,
  payload: error,
});

export const getScholarshipData = id => ({
  type: GET_DATA,
  payload: id
})

export const getDataSuccess = data => ({
  type: GET_DATA_SUCCESS,
  payload: data,
});

export const getDataFail = error => ({
  type: GET_DATA_ERROR,
  payload: error,
});

