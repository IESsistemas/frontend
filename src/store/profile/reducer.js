import {
  CLEAN_MODAL,
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
  CHANGE_PASS,
  PROV_LOC_NEI,
  PROV_LOC_NEI_SUCCESS
} from "./actionTypes";

const initialState = {
  errorMsg: "",
  loading: false,
  error: false,
  addressType: [
    {id: 'F', name: 'FAMILIAR'},
    {id: 'E', name: 'ENVIO'},
    {id: 'H', name: 'HABITA'},
    {id: 'O', name: 'OTROS'},
  ],
  counties: [],
  provinces: [],
  localities: [],
  neighbours: [],

  userEmail: null,
  userAddress: []
};

const switchfun = (state = initialState, action) => {
  switch (action.type) {
    /*case CLEAN_MODAL:
      state = {
        ...state,
        modalTitle: "",
        modalText: "",
      };
      break;*/
    case CHANGE_EMAIL:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case CHANGE_EMAIL_SUCCESS:
      state = {
        ...state,
        loading: false,
        modalTitle: action.payload.title,
        modalText: action.payload.text,
        modalRefresj: Date.now(),
      };
      break;
    case CHANGE_PASS:
      state = {
        ...state
      };
      break;
    case PERSONAL_INFO:
      state = {
        ...state,
        loading: true
      };
    break;
    case PERSONAL_INFO_SUCCESS:
      state = {
        ...state,
        loading: false,
        userEmail: action.payload.userEmail,
        userAddress: action.payload.userAddress,
        counties: action.payload.counties,
        phones: action.payload.phones,
      };
    break;

    case PROVINCES:
      state = {
        ...state,
        loading: true
      };
    break;
    case PROVINCES_SUCCESS:
      state = {
        ...state,
        loading: false,
        provinces: action.payload.provinces,
        localities: [],
        neighbours: [],
      };
    break;

    case PROV_LOC_NEI:
      state = {
        ...state,
        loading: true
      };
    break;
    case PROV_LOC_NEI_SUCCESS:
      state = {
        ...state,
        loading: false,
        provinces: action.payload.provinces,
        localities: action.payload.localities,
        neighbours: action.payload.neighbours,
      };
    break;

    case LOCALITIES:
      state = {
        ...state,
        loading: true
      };
    break;
    case LOCALITIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        localities: action.payload.localities,
        neighbours: [],
      };
    break;

    case NEIGHBOURS:
      state = {
        ...state,
        loading: true
      };
    break;
    case NEIGHBOURS_SUCCESS:
      state = {
        ...state,
        loading: false,
        neighbours: action.payload.neighbours
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
