import { SET_SOS_ALERT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_SOS_ALERT:
      return {
        ...state,
        scrollPosition: action.payload,
      };
    default:
      return state;
  }
};
