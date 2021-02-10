import {
  GET_FILELOG_UPDATE_DATE,
  GET_FILELOG_UPDATE_DATE_ERROR,
  GET_FILELOG_UPDATE_DATE_TODAY,
  GET_FILELOG_UPDATE_DATE_ERROR_TODAY,
} from "./types";
import api from "../utils/api";
//import { setAlert } from './alert';

import moment from "moment-timezone";
/*
const updateDate = moment()
.utcOffset("+01:00")
.format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").substring(0,10);
*/
export const getFileLog_ByUpdateDate = (
  updateDate,
  agentId,
  updated,
  fileId,
  end
) => async (dispatch) => {
  try {
    var body;
    body = {updateDate, agentId, updated, fileId, end}
    //console.log("body");
    //console.log(body);
    //console.log("body");
    const res = await api.post("/files/getFileByUpdateDate", body);
   // console.log(res.data);
    dispatch({
      type: GET_FILELOG_UPDATE_DATE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FILELOG_UPDATE_DATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFileLog_ByUpdateDate_today = (
  updateDate,
  agentId,
) => async (dispatch) => {
  try {
    var body;
    body = {updateDate, agentId}
    console.log("bodyc");
    console.log(body);
    console.log("bodyc");
    const res = await api.post("/files/getFileByUpdateDate", body);
    
    console.log("res.data today updatedc")
    console.log(res.data);
    console.log(res.data);
    console.log("res.data today updatedc")
    dispatch({
      type: GET_FILELOG_UPDATE_DATE_TODAY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FILELOG_UPDATE_DATE_ERROR_TODAY,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

