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

  ${({ subtle }) =>
    subtle &&
    css`
      opacity: 0.5;
    `}
`;

const Heading = ({ children, small, subtle }) => {
  return (
    <StyledHeading small={small} subtle={subtle}>
      {children}
    </StyledHeading>
  );
};

export default Heading;
