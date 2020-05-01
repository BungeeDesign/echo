import React, { useReducer } from 'react';
import API from '../../utils/API';
import UserContext from './userConext';
import UserReducer from './userReducer';
import { GET_USERS, SET_SCROLL } from './types';

const UserState = (props) => {
  const initialState = {
    users: [],
    scrollPosition: 0,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Get Users
  const getUsers = async () => {
    const res = await API.get('users');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  };

  /**
   * @Todo Component Actions - Refactor to another context potentially? Non API based
   */

  const setScrollPosition = async (position) => {
    dispatch({
      type: SET_SCROLL,
      payload: position,
    });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        scrollPosition: state.scrollPosition,
        getUsers,
        setScrollPosition,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
