import { GET_USERS, SET_SCROLL, GET_MESSAGES, SET_HAS_MESSAGES } from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case SET_HAS_MESSAGES:
      return {
        ...state,
        hasMessages: action.payload,
      };
    case SET_SCROLL:
      return {
        ...state,
        scrollPosition: action.payload,
      };
    default:
      return state;
  }
};
