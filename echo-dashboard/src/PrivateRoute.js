import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth/auth';
import verifyToken from './context/auth/verifyToken';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();

  let isValidToken;

  if (authTokens !== null) {
    isValidToken = verifyToken(authTokens);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isValidToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
