import React, { useReducer, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
// import API from '../../utils/API';
import SosContext from '../sos/sosContext';
import SosReducer from '../sos/sosReducer';
import { SET_SOS_ALERT, SET_ONBOARDED } from '../types';

const SosState = (props) => {
  const initialState = {
    sosAlert: false,
    userOnboarded: false,
  };

  const [state, dispatch] = useReducer(SosReducer, initialState);

  const setSosAlert = async (sos) => {
    dispatch({
      type: SET_SOS_ALERT,
      payload: sos,
    });
  };

  // Force the bottom menu to re-render by setting the onboarded context state (Declaring in the SOS context as it's not nesscary to create another context)
  const setOnboarded = async (onboarded) => {
    dispatch({
      type: SET_ONBOARDED,
      payload: onboarded,
    });
  };

  return (
    <SosContext.Provider
      value={{
        sosAlert: state.sosAlert,
        userOnboarded: state.userOnboarded,
        setSosAlert,
        setOnboarded,
      }}
    >
      {props.children}
    </SosContext.Provider>
  );
};

export default SosState;
