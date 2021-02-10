import api from './api';
import cookie from 'react-cookies';

const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = 'BEARER ' + token;
    cookie.save('token', token, { path: '/' });
  } else {
    delete api.defaults.headers.common['Authorization'];
    cookie.remove('token');
  }
};

export default setAuthToken;