import {
  GET_FILE,
  GET_FILE_ERROR,
  GET_FILE_CONDITIONS,
  GET_FILE_CONDITIONS_ERROR,
  GET_FILE_PIECES,
  GET_FILE_PIECES_ERROR,
  SEND_FILE_ID_TO_COMPONENT,
  SEND_FILE_ID_TO_COMPONENT_ERROR,
  LEAVE,
  GET_FILELOG_BY_FILE_ID,
  GET_FILELOG_BY_FILE_ID_ERROR,
  SEND_FILE_ID_TO_COMPONENT_FILE,
  SEND_FILE_ID_TO_COMPONENT_ERROR_FILE,
} from "../actions/types";

const initialState = {
  file: [],
  conditions: [],
  pieces: [],
  log: [],
  fileId: "",
  fileIdfile: "",
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FILE:
      return {
        ...state,
        file: payload,
        loading: false,
      };
    case GET_FILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_FILE_CONDITIONS:
      return {
        ...state,
        conditions: payload,
        loading: false,
      };
    case GET_FILE_CONDITIONS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_FILE_PIECES:
      return {
        ...state,
        pieces: payload,
        loading: false,
      };
    case GET_FILE_PIECES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SEND_FILE_ID_TO_COMPONENT:
      return {
        ...state,
        fileId: payload,
        loading: false,
      };
    case SEND_FILE_ID_TO_COMPONENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_FILELOG_BY_FILE_ID:
      return {
        ...state,
        log: payload,
        loading: false,
      };
    case GET_FILELOG_BY_FILE_ID_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SEND_FILE_ID_TO_COMPONENT_FILE:
      return {
        ...state,
        fileIdfile: payload,
        loading: false,
      };
    case SEND_FILE_ID_TO_COMPONENT_ERROR_FILE:
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
