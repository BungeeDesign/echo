import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

const sos = keyframes`
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
    transform: scale(1.7);
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
`;

const UserPin = ({ onClick }) => {
  return (
    <StyledPin onClick={onClick}>
      <FontAwesomeIcon icon={faUser} />
    </StyledPin>
  );
};

export default UserPin;
