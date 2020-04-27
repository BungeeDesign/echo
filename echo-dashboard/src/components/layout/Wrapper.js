import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
