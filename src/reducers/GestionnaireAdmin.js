import {
  ADD_AGENT,
  AGENT_ERROR,
  GET_AGENT,
  GET_ONE_AGENT,
  ONE_AGENT_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  agents: [],
  agent: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_AGENT:
      return {
        ...state,
        loading: false,
      };
    case AGENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_AGENT:
      return {
        ...state,
        agents: payload,
        loading: false,
      };

    case ONE_AGENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_ONE_AGENT:
      return {
        ...state,
        agent: payload,
        loading: false,
      };

    default:
      return state;
  }
}
