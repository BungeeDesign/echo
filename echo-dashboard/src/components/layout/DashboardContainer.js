import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); */
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 400px;
  place-items: center;
`;

const DashboardContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default DashboardContainer;
