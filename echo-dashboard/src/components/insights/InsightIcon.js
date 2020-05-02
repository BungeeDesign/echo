import React from 'react';
import styled, { keyframes } from 'styled-components';
import insightBulb from '../../assets/images/insights-bulb.png';

const bulbGlow = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  .insight-bulb {
    width: 40px;
  }

  .insight-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.darkOrange};
    color: white;
    font-size: 1rem;
    margin-bottom: -34px;
    z-index: 3;
    transition: 0.5s ease;

    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
`;

const InsightIcon = () => {
  return (
    <StyledIcon>
      <div className="insight-badge">
        <strong>2</strong>
      </div>
      <img src={insightBulb} className="insight-bulb" />
    </StyledIcon>
  );
};

export default InsightIcon;
