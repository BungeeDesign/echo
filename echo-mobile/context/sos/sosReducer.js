import { SET_SOS_ALERT, SET_ONBOARDED } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_SOS_ALERT:
      return {
        ...state,
        scrollPosition: action.payload,
      };
    case SET_ONBOARDED:
      return {
        ...state,
        userOnboarded: action.payload,
      };
    default:
      return state;
  }
};
