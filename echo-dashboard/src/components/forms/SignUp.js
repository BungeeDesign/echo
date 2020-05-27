import React from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

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
      content: 'Signup';
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

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          name="Name"
          ref={register({ required: true, maxLength: 250 })}
        />
        <input
          type="text"
          placeholder="Organization"
          name="Organization"
          ref={register({ required: true })}
        />
        <input
          type="text"
          placeholder="Local Hub"
          name="Local Hub"
          ref={register}
        />
        <input type="text" placeholder="City" name="City" ref={register} />
        <input
          type="email"
          placeholder="Email"
          name="Email"
          ref={register({ required: true, maxLength: 300 })}
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          ref={register({ required: true, max: 100, min: 8, maxLength: 100 })}
        />

        <button type="submit">Signup</button>
      </form>
    </StyledContainer>
  );
}
