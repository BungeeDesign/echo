import { SET_SOS_ALERT, SET_ONBOARDED, GET_MESSAGES } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_SOS_ALERT:
      return {
        ...state,
        sosAlert: action.payload,
      };
    case SET_ONBOARDED:
      return {
        ...state,
        userOnboarded: action.payload,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};
