import React from "react";
import styled from "styled-components";

const StyledStatsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-radius: ${({ theme }) => theme.radius.medium};
  width: 400px;
  height: 300px;
  box-shadow: ${({ theme }) => theme.shadow.light};

  & div {
    margin: 20px;
  }
`;

const StatContainer = ({ children }) => {
  return (
    <StyledStatsContainer>
      <div>{children}</div>
    </StyledStatsContainer>
  );
};
export default StatContainer;
