import { GET_USERS, SET_SCROLL } from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
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
