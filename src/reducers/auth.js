import { LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/types'
import jwt from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import cookie from 'react-cookies';
const initialState = {
    token: (cookie.load('token') === undefined) ? null : cookie.load('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: jwt(cookie.load('token'))
            };
        case LOGIN_SUCCESS:
            cookie.save('token', payload.token, { path: '/' });
            setAuthToken(cookie.load('token'));
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user: jwt(cookie.load('token'))
            }
        case LOGIN_FAIL:
        case LOGOUT:
            cookie.remove('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case AUTH_ERROR:

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };

        default:
            return state;

    }

}