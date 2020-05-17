import React, { useReducer, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
// import API from '../../utils/API';
import SosContext from '../sos/sosContext';
import SosReducer from '../sos/sosReducer';
import { SET_SOS_ALERT } from '../types';

const SosState = (props) => {
  const initialState = {
    sosAlert: false,
  };

  const [state, dispatch] = useReducer(SosReducer, initialState);

  const setSosAlert = async () => {
    console.log('Running....');
    const socket = socketIOClient('http://127.0.0.1:1255', {
      jsonp: false,
      agent: '-',
      pfx: '-',
      cert: '-',
      ca: '-',
      ciphers: '-',
      rejectUnauthorized: '-',
      perMessageDeflate: '-',
    });
    socket.on('sosAlert', (data) => {
      console.log('BEEP BEEEP SOS Alert!!!!!!! Active');
      // dispatch({
      //   type: SET_SOS_ALERT,
      //   payload: data,
      // });
    });
  };
  // setSosAlert();

  return (
    <SosContext.Provider
      value={{
        sosAlert: state.sosAlert,
        setSosAlert,
      }}
    >
      {props.children}
    </SosContext.Provider>
  );
};

export default SosState;
