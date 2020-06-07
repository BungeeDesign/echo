import React, { useReducer, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
import API from '../../utils/API';
import SosContext from './sosContext';
import SosReducer from '../sos/sosReducer';
import { SET_SOS_ALERT, SET_ONBOARDED, GET_MESSAGES } from '../types';

const SosState = (props) => {
  const initialState = {
    sosAlert: false,
    userOnboarded: false,
    messages: [],
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

  // Get User Messages
  const getMessages = async () => {
    const res = await API.get('/messages');

    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  };

  return (
    <SosContext.Provider
      value={{
        sosAlert: state.sosAlert,
        userOnboarded: state.userOnboarded,
        messages: state.messages,
        setSosAlert,
        setOnboarded,
        getMessages,
      }}
    >
      {props.children}
    </SosContext.Provider>
  );
};

export default SosState;
