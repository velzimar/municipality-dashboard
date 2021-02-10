import { GET_MUNICIPALITE, MUNICIPALITE_ERROR, CREATE_MUNICIPALITE, DELETE_MUNICIPALITE } from "../actions/types";

const initialState = {
    municipalites: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_MUNICIPALITE:
            return {
                ...state,
                municipalites: payload,
                loading: false
            };
        case MUNICIPALITE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CREATE_MUNICIPALITE:
        case DELETE_MUNICIPALITE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;

    }

}