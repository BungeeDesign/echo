import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  grid-column-start: 1;
  grid-column-end: -1;
`;

const DashboardMap = ({ children }) => {
  return <StyledContainer></StyledContainer>;
};

export default DashboardMap;
