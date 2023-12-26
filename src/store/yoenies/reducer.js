import {
  ACCOUNT_STATMENT,
  ACCOUNT_STATMENT_SUCCESS
} from "./actionTypes";

const initialState = {
  saldo: null,
  vencimientos: [],
  movimientos: [],
  cupon: 0
};

const switchfun = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_STATMENT:
      state = {
        ...state
      };
    break;
    case ACCOUNT_STATMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        saldo: action.payload.saldo,
        vencimientos: action.payload.vencimientos,
        movimientos: action.payload.movimientos,
        cupon: action.payload.cupon
      };
    break;
    default:
      state = { ...state };
      break;
  }
  state = { ...state };
  return state;
};

export default switchfun;
