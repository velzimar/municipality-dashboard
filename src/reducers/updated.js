import {
  GET_FILELOG_UPDATE_DATE,
  GET_FILELOG_UPDATE_DATE_ERROR,
  LEAVE,
  GET_FILELOG_UPDATE_DATE_TODAY,
  GET_FILELOG_UPDATE_DATE_ERROR_TODAY,
} from "../actions/types";

const initialState = {
  updated: [],
  updatedToday:[],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FILELOG_UPDATE_DATE:
      return {
        ...state,
        updated: payload,
        loading: false,
      };
    case GET_FILELOG_UPDATE_DATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

      case GET_FILELOG_UPDATE_DATE_TODAY:
      return {
        ...state,
        updatedToday: payload,
        loading: false,
      };
    case GET_FILELOG_UPDATE_DATE_ERROR_TODAY:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LEAVE:
      return initialState;
    default:
      return state;
  }
}
