import {
  GET_FILE_CREATION_DATE,
  GET_FILE_CREATION_DATE_ERROR,
  LEAVE,
  GET_FILE_CREATION_DATE_TODAY,
  GET_FILE_CREATION_DATE_ERROR_TODAY,
} from "../actions/types";

const initialState = {
  created: [],
  createdToday: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FILE_CREATION_DATE:
      return {
        ...state,
        created: payload,
        loading: false,
      };
    case GET_FILE_CREATION_DATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_FILE_CREATION_DATE_TODAY:
      return {
        ...state,
        createdToday: payload,
        loading: false,
      };
    case GET_FILE_CREATION_DATE_ERROR_TODAY:
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
