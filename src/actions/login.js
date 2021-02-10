import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, LOGOUT } from '../actions/types';
import api from '../utils/api';
import { setAlert } from './alert';

// Load User
export const loadUser = () => dispatch => {
  dispatch({
    type: USER_LOADED,
  });
};



// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/admins/login', body);


    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });




  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });