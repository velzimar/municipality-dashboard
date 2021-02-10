import { GET_MUNICIPALITE, CREATE_MUNICIPALITE, MUNICIPALITE_ERROR, DELETE_MUNICIPALITE } from './types';
import api from '../utils/api';
import { setAlert } from './alert';

export const getMunicipalite = () => async dispatch => {
  try {
    const res = await api.get("/municipalities/getMunicipality");

    dispatch({
      type: GET_MUNICIPALITE,
      payload: res.data
    });

  } catch (err) {

    dispatch({

      type: MUNICIPALITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}


export const createMunicipalite = (governorate, city, cityLatitude, cityLongitude) => async dispatch => {
  const body = { governorate, city, cityLatitude, cityLongitude };

  try {
    const res = await api.post('/municipalities/createMunicipality', body);

    dispatch({
      type: CREATE_MUNICIPALITE,
      payload: res.data
    });

    dispatch(setAlert('municipality created sucessfully', 'success'));


  } catch (err) {

    const errors = Object.values(err.response.data);

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: MUNICIPALITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteMunicipalite = (municipalityId) => async dispatch => {
  const body = { municipalityId: municipalityId };

  try {
    await api.post('/municipalities/deleteMunicipality', body);

    dispatch({
      type: DELETE_MUNICIPALITE,
    });


  } catch (err) {

    dispatch({
      type: MUNICIPALITE_ERROR,
    });
  }
};