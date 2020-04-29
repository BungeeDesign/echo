import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
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
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: white;
  animation: ${pulse} 2.5s ease infinite;
`;

const Pin = ({ onClick }) => {
  return <StyledPin onClick={onClick}></StyledPin>;
};

export default Pin;
