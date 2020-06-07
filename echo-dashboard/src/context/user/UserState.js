import React, { useReducer, useCallback } from 'react';
import API from '../../utils/API';
import UserContext from './userConext';
import UserReducer from './userReducer';
import { GET_USERS, SET_SCROLL, GET_MESSAGES, SET_HAS_MESSAGES } from './types';

const UserState = (props) => {
  const initialState = {
    users: [],
    scrollPosition: 0,
    messages: [],
    hasMessages: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUsers = useCallback(async () => {
    const res = await API.get('users');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  }, [initialState.users]);

  const setScrollPosition = async (position) => {
    dispatch({
      type: SET_SCROLL,
      payload: position,
    });
  };

  // Get user messages
  const getMessages = async () => {
    const res = await API.get('/messages');
    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });

    const userID = JSON.parse(localStorage.getItem('admin'));
    for (const message of res.data) {
      if (
        message.messageRoom[0] === userID ||
        message.messageRoom[1] === userID
      ) {
        dispatch({
          type: SET_HAS_MESSAGES,
          payload: true,
        });
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        messages: state.messages,
        hasMessages: state.hasMessages,
        scrollPosition: state.scrollPosition,
        getUsers,
        getMessages,
        setScrollPosition,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
