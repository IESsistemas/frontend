import {
  SET_LOADING,
  SET_GLOBAL_LOADING
} from "./actionTypes";

const initialState = {
  loading: false
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_GLOBAL_LOADING: // Nuevo caso de acción
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
