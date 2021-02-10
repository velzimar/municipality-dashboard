import { GET_COUNT, DELETE_COUNT, COUNT_ERROR } from "../actions/types";

const initialState = {
    counts: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COUNT:
            return {
                ...state,
                counts: payload,
                loading: false
            };
        case DELETE_COUNT:
            return {
                ...state,
                counts: null,
                loading: false,
            };
        case COUNT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }

}