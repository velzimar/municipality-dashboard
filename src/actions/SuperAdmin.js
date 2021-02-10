import { GET_ADMIN, ADMIN_ERROR } from './types';
import api from '../utils/api';

export const getAdmin = () => async dispatch => {

  try {
    const res = await api.get('/admins/getAdmin');

    dispatch({
      type: GET_ADMIN,
      payload: res.data
    });

  } catch (err) {

    dispatch({

      type: ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const deleteAdmin = (adminId) => async dispatch => {
  const body = { adminId };

  try {
    const res = await api.post('/admins/deleteAdmin', body);


    dispatch({

      payload: res.data
    });




  } catch (err) {
    console.log(err);


    dispatch({
      type: ADMIN_ERROR
    });
  }
};

