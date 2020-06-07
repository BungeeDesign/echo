import React from 'react';
import styled, { css } from 'styled-components';

const StyledHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: white;

  ${({ small }) =>
    small &&
    css`
      font-size: 1rem;
      margin: 0px;
    `}

  ${({ medium }) =>
    medium &&
    css`
      font-size: 1.5rem;
      margin: 0px;
    `}

  ${({ large }) =>
    large &&
    css`
      font-size: 2.5rem;
      margin: 0px;
    `}

  ${({ subtle }) =>
    subtle &&
    css`
      opacity: 0.5;
    `}

  ${({ right }) =>
    right &&
    css`
      margin-right: 20px;
    `}
`;

const Heading = ({ children, small, medium, large, subtle, right }) => {
  return (
    <StyledHeading
      small={small}
      medium={medium}
      large={large}
      subtle={subtle}
      right={right}
    >
      {children}
    </StyledHeading>
  );
};

export default Heading;
