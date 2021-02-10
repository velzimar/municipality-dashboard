import {
  GET_FILE,
  GET_FILE_ERROR,
  GET_FILE_CONDITIONS,
  GET_FILE_CONDITIONS_ERROR,
  GET_FILE_PIECES,
  GET_FILE_PIECES_ERROR,
  SEND_FILE_ID_TO_COMPONENT,
  SEND_FILE_ID_TO_COMPONENT_ERROR,
  GET_FILELOG_BY_FILE_ID,
  GET_FILELOG_BY_FILE_ID_ERROR,
  SEND_FILE_ID_TO_COMPONENT_FILE,
  SEND_FILE_ID_TO_COMPONENT_ERROR_FILE
} from "./types";
import api from "../utils/api";

export const getOneFile = (fileId) => async (dispatch) => {
  try {
    var body = { fileId };
    console.log(body);
    console.log(fileId);
    let res = await api.post("/files/getFile", body);
    console.log(res.data);
    dispatch({
      type: GET_FILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOneFileConditions = (fileId) => async (dispatch) => {
  try {
    var body = { fileId };
    console.log(body);
    console.log(fileId);
    let res = await api.post("/fileconditions/getfileconditionsByFile", body);
    console.log(res.data);
    dispatch({
      type: GET_FILE_CONDITIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FILE_CONDITIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOneFilePieces = (fileId) => async (dispatch) => {
  try {
    var body = { fileId };
    console.log(body);
    console.log(fileId);
    let res = await api.post("/filepieces/getfilepiecesByFile", body);
    console.log(res.data);
    dispatch({
      type: GET_FILE_PIECES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FILE_PIECES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const sendId = (fileId) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_FILE_ID_TO_COMPONENT,
      payload: fileId,
    });
    console.log("id " + fileId + " send");
  } catch (err) {
    dispatch({
      type: SEND_FILE_ID_TO_COMPONENT_ERROR,
      payload: { msg: "noId", status: "404" },
    });
  }
};

export const sendIdFile = (fileId) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_FILE_ID_TO_COMPONENT_FILE,
      payload: fileId,
    });
    console.log("id " + fileId + " send");
  } catch (err) {
    dispatch({
      type: SEND_FILE_ID_TO_COMPONENT_ERROR_FILE,
      payload: { msg: "noId", status: "404" },
    });
  }
};

export const getFileLog_ByFileId = (fileId) => async (dispatch) => {
  try {
  var body = { fileId };
  console.log(body);
  console.log(fileId);
  let res = await api.post("/files/getFileLogByFileId", body);
  console.log("logaaa"+res.data);
    dispatch({
      type: GET_FILELOG_BY_FILE_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FILELOG_BY_FILE_ID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};