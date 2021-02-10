import { AGENT_ERROR, ADD_AGENT, GET_AGENT, GET_ONE_AGENT, ONE_AGENT_ERROR } from './types';
import api from '../utils/api';



// Login User
export const addAgent = (email, password, municipalityId) => async dispatch => {
  const body = { email, password, municipalityId };

  try {
    const res = await api.post('/admins/signup', body);

    dispatch({
      type: ADD_AGENT,
      payload: res.data
    });

  } catch (err) {


    dispatch({
      type: AGENT_ERROR
    });
  }
};

export const getAgents = () => async dispatch => {
  try {
    const res = await api.post("/agents/getAgent");
    dispatch({
      type: GET_AGENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AGENT_ERROR,
    });
  }
}


export const getOneAgent = (agentId) => async dispatch => {
  try {
    let body = {agentId}
    const res = await api.post("/agents/getAgent",body);
    //console.log(res.data)
    dispatch({
      type: GET_ONE_AGENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ONE_AGENT_ERROR,
    });
  }
}