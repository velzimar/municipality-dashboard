import {
  GET_FILE_CREATION_DATE,
  GET_FILE_CREATION_DATE_ERROR,
  GET_FILE_CREATION_DATE_TODAY,
  GET_FILE_CREATION_DATE_ERROR_TODAY
} from './types';
import api from '../utils/api';
//import { setAlert } from './alert';

import moment from "moment-timezone";
/*
const creationDate = moment()
.utcOffset("+01:00")
.format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").substring(0,10);
*/
export const getFileLog_ByCreationDate = (creationDate, agentId, end) => async dispatch => {
  try {
    var body = { creationDate, agentId, end }
    //console.log(body)
    const res = await api.post("/files/getFileByCreationDate", body);
    //console.log(res.data)
    dispatch({
      type: GET_FILE_CREATION_DATE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_FILE_CREATION_DATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const getFileLog_ByCreationDate_today = (creationDate,agentId) => async dispatch => {
  try {
    var body = { creationDate, agentId }
    //console.log(body)
    const res = await api.post("/files/getFileByCreationDate", body);
    /*
    console.log("res.data today created")
    console.log(res.data)
    console.log("res.data today created")*/
    dispatch({
      type: GET_FILE_CREATION_DATE_TODAY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_FILE_CREATION_DATE_ERROR_TODAY,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}