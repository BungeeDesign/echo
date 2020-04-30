import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled, { css, keyframes } from 'styled-components';

const sosFlash = keyframes`
  0% {
    box-shadow: 0 0 35px 0px rgb(255, 0, 0, 0.8);
  }

  100% {
    box-shadow: 0 0 35px 15px rgb(255, 0, 0, 0.8);
  }
`;

const StyledPin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: white;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.lightOrange};
  box-shadow: 0 0 35px #e47756;
  transition: 0.5s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }

  ${({ sos }) =>
    sos &&
    css`
      color: rgb(255, 0, 0, 0.8);
      animation: ${sosFlash} 0.8s ease infinite alternate-reverse;
    `}
`;

const UserPin = ({ onClick, sos }) => {
  return (
    <StyledPin onClick={onClick} sos={sos}>
      <FontAwesomeIcon icon={faUser} />
    </StyledPin>
  );
};

export default UserPin;
