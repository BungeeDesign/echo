import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Heading from '../layout/Heading';
import LoginForm from '../forms/LoginForm';
import EchoLogo from '../../assets/images/echo-symbol-blue.svg';
import Globe from '../home/Globe';
import connectedMap from '../../assets/images/home/connected-map.svg';
import { Link } from 'react-router-dom';

const hueRotate = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(180deg);
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    margin-top: 50px;
  }

  .login-content {
    width: 900px;
    height: 800px;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;

    img {
      width: 100%;
      max-width: 50px;
      margin-bottom: 50px;
    }
  }
`;

const Login = ({ children, small, subtle }) => {
  return (
    <StyledContainer>
      <div className="login-content">
        <img src={EchoLogo} />
        <LoginForm />

        <Link to="/">
          <span>Don't have an account?</span>
        </Link>
      </div>
    </StyledContainer>
  );
};

export default Login;
