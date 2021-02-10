import { GET_ADMIN, ADMIN_ERROR } from "../actions/types";

const initialState = {
    loading: true,
    admins: [],
    admin: null,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADMIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case GET_ADMIN:
            return {
                ...state,
                admins: payload,
                loading: false,
            };
        default:
            return state;

    }

}