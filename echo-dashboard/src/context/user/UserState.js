import React, { useReducer } from 'react';
import API from '../../utils/API';
import UserContext from './userConext';
import UserReducer from './userReducer';
import { GET_USERS } from './types';

const UserState = (props) => {
  const initialState = {
    users: [],
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

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        getUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
