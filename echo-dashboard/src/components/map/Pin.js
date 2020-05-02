import React from 'react';
import styled, { keyframes } from 'styled-components';
import echoHub from '../../assets/images/echo-hub.png';

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
  .echo-hub {
    width: 60px;
  }
`;

const Pin = ({ onClick }) => {
  return (
    <StyledPin onClick={onClick}>
      <img src={echoHub} className="echo-hub" />
    </StyledPin>
  );
};

export default Pin;
