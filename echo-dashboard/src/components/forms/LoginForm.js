import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import API from '../../utils/API';
import { useAuth } from '../../context/auth/auth';
import { Redirect } from 'react-router-dom';

const StyledContainer = styled.div`
  form {
    display: grid;
    grid-template-columns: repeat(2, 250px);
    grid-gap: 10px;
  }

  input {
    outline: 0;
    border: 0;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: white;
    font-size: 1.1rem;
    padding: 20px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.shadow.light};

    ::placeholder {
      color: ${({ theme }) => theme.colors.lightBlue};
    }
  }

  button {
    outline: 0;
    border: 0;
    cursor: pointer;
    grid-column: span 2;
    background-color: ${({ theme }) => theme.colors.oceanBlue};
    color: white;
    font-size: 1.1rem;
    padding: 20px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.shadow.light};
    overflow: hidden;
    position: relative;

    :before {
      content: ' ';
      width: 200px;
      height: 200px;
      border-radius: 100px;
      background-color: ${({ theme }) => theme.colors.darkBlue};
      position: absolute;
      left: 155px;
      bottom: -70px;
      transform: scale(0);
      transition: cubic-bezier(1, -0.12, 0.32, 1.04) 0.8s;
    }

    :after {
      position: absolute;
      width: 100%;
      height: 61px;
      display: flex;
      color: white;
      font-size: 1.1rem;
      content: 'Login';
      margin-left: -20px;
      justify-content: center;
      align-items: center;
      bottom: 0;
    }

    :hover {
      :before {
        transform: scale(2.6);
      }
    }
  }

  .errors {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;

    span {
      height: 20px;
    }
  }
`;

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await API.post('admins/login', data);
      if (res.status === 500) {
        setError(res.data.message);
      } else if (res.status === 200) {
        setAuthTokens(res.data);
        setLoggedIn(true);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <StyledContainer>
      <div className="errors">
        <span>{error}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={register({ required: true, maxLength: 300 })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true, max: 100, min: 8, maxLength: 100 })}
        />

        <button type="submit">Login</button>
      </form>
    </StyledContainer>
  );
}
