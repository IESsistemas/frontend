import {
  GET_EXCEPTION,
  GET_EXCEPTION_SUCCESS,
  GET_EXCEPTION_ERROR,
  GET_DATA_EXCEPTION,
  GET_DATA_CONDITIONAL_SUCCESS,
  GET_DATA_LISTENER_SUCCESS,
  GET_DATA_EXCEPTION_ERROR,
  POST_EXCEPTION,
  POST_EXCEPTION_SUCCESS,
  POST_EXCEPTION_ERROR,
  GET_COMMISSIONS,
  GET_COMMISSIONS_SUCCESS,
  GET_COMMISSIONS_ERROR,
  GET_EXCEPTION_PROCESSED,
  GET_EXCEPTION_PROCESSED_SUCCESS,
  GET_EXCEPTION_PROCESSED_ERROR,
  GET_DATA_ANOTHER_CAREER_SUCCESS
} from "./actionTypes"

export const getException =  (data, history) => ({
  type: GET_EXCEPTION,
  payload: {data, history}
})

export const getExceptionSuccess = exception => ({
  type: GET_EXCEPTION_SUCCESS,
  payload: exception,
});

export const getExceptionFail = error => ({
  type: GET_EXCEPTION_ERROR,
  payload: error,
});

 export const getDataException =  (idCareer, option) => ({
  type: GET_DATA_EXCEPTION,
  payload: {idCareer, option}
})

export const getDataConditionalSuccess = data => ({
  type: GET_DATA_CONDITIONAL_SUCCESS,
  payload: data,
});

export const getDataListenerSuccess = data => ({
  type: GET_DATA_LISTENER_SUCCESS,
  payload: data,
});

export const getDataExceptionFail = error => ({
  type: GET_DATA_EXCEPTION_ERROR,
  payload: error,
});
export const getDataAnotherCareerSuccess = data => ({
  type: GET_DATA_ANOTHER_CAREER_SUCCESS,
  payload: data,
});


export const postException = (data, history) => ({
  type: POST_EXCEPTION,
  payload: {data, history}
})

export const postExceptionSuccess = data => ({
  type: POST_EXCEPTION_SUCCESS,
  payload: data,
});

export const postExceptionFail = error => ({
  type: POST_EXCEPTION_ERROR,
  payload: error,
}); 

export const getCommissions = (data) => ({
  type: GET_COMMISSIONS,
  payload: {data}
})

export const getCommissionsSuccess = data => ({
  type: GET_COMMISSIONS_SUCCESS,
  payload: data,
});

export const getCommissionsFail = error => ({
  type: GET_COMMISSIONS_ERROR,
  payload: error,
}); 

export const getExceptionProcessed =  () => ({
  type: GET_EXCEPTION_PROCESSED,
})

export const getExceptionProcessedSuccess = processed => ({
  type: GET_EXCEPTION_PROCESSED_SUCCESS,
  payload: processed,
});

export const getExceptionProcessedFail = error => ({
  type: GET_EXCEPTION_PROCESSED_ERROR,
  payload: error,
});