import React from "react";
import styled, { css } from "styled-components";

const StyledHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: white;

  ${({ small }) =>
    small &&
    css`
      font-size: 1rem;
      margin: 0px;
    `}
`;

const Heading = ({ children, small }) => {
  return <StyledHeading small={small}>{children}</StyledHeading>;
};

export default Heading;
