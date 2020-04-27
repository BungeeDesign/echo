import React from "react";
import styled from "styled-components";

const StyledHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: white;
`;

const Heading = ({ children }) => {
  return <StyledHeading>{children}</StyledHeading>;
};

export default Heading;
