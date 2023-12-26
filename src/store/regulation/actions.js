import {
  POST_REGULATION,

} from "./actionTypes"


export const regulation = (data, history) => {
  return {
    type: POST_REGULATION,
    payload: { data, history },
  };
};


