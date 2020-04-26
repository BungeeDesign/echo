import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: grid;
`;

const DashboardContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default DashboardContainer;
