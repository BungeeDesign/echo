import React from "react";
import styled, { keyframes } from "styled-components";

const load = keyframes`
  0% {
    transform-origin: left;
    transform: scaleX(0);
  }

  100% {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

const StyledBar = styled.div`
  width: ${({ percent }) => percent}%;
  height: 30px;
  margin-top: 20px;
  border-radius: 100px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.oceanBlue} 0%,
    ${({ theme }) => theme.colors.skyBlue} 100%
  );
  animation: ${load} 0.9s ease;
  color: white;
  font-size: 1.1em;

  & div {
    display: grid !important;
    justify-content: start !important;
    grid-template-columns: 1fr 190px;
    align-items: center;
    position: absolute;
    margin-top: 5px;
    margin-left: 10px;
  }
`;

const StatBar = ({ percent, children }) => {
  return (
    <StyledBar percent={percent}>
      <div>{children}</div>
    </StyledBar>
  );
};

export default StatBar;
