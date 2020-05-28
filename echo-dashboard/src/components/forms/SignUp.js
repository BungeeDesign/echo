import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { keyframes, css } from 'styled-components';
import API from '../../utils/API';
import Heading from '../layout/Heading';
import { Redirect } from 'react-router-dom';

const formOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(15px);
  }
`;

const successMessageIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(15px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const StyledContainer = styled.div`
  ${({ isRegisterd }) =>
    isRegisterd &&
    css`
      animation: ${formOut} ease 0.8s forwards;
    `}

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
      content: 'Sign Up';
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
`;

const SuccessMessage = styled.div`
  position: absolute;
  opacity: 0;
  animation: ${successMessageIn} ease 0.8s forwards;
  margin-top: 150px;
`;

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const [isRegisterd, setRegisterd] = useState(false);

  const onSubmit = async (data) => {
    // Format the form data for the register request
    const registerObj = {
      name: data.name,
      organization: data.organization,
      localHub: data.localHub,
      loginDetails: {
        email: data.email,
        password: data.password,
      },
    };

    try {
      const res = await API.post('/admins/register', registerObj);
      if (res.data.msg === 'success') {
        setRegisterd(true);

        setTimeout(() => {
          window.location.href = '/login';
        }, 1200);
      }
    } catch (error) {
      console.log('[Register Error] -', error.response);
    }
  };

  return (
    <>
      {isRegisterd && (
        <SuccessMessage>
          <div className="success-content">
            <Heading>You have successfully signed up! 🙌</Heading>
          </div>
        </SuccessMessage>
      )}

      <StyledContainer isRegisterd={isRegisterd}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            ref={register({ required: true, maxLength: 250 })}
          />
          <input
            type="text"
            placeholder="Organization"
            name="organization"
            ref={register({ required: true })}
          />
          <input
            type="text"
            placeholder="Local Hub"
            name="localHub"
            ref={register}
          />
          <input type="text" placeholder="City" name="City" ref={register} />
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
            ref={register({
              required: true,
              max: 100,
              min: 8,
              maxLength: 100,
            })}
          />

          <button type="submit">Sign Up</button>
        </form>
      </StyledContainer>
    </>
  );
}
