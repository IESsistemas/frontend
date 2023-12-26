import {
  POST_REGULATION,
} from "./actionTypes";

const initialState = {
  condition: false,
};

const Regulation = (state = initialState, action) => {
  switch (action.type) {
    case POST_REGULATION:
      state = {
        ...state,
        condition: true,
      };
      break;

    default:
      state = { ...state };
      break;

  }
  return state;
};

export default Regulation;
