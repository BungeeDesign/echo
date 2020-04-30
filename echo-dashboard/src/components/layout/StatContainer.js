import React from 'react';
import styled from 'styled-components';

const StyledStatsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-radius: ${({ theme }) => theme.radius.medium};
  width: 500px;
  height: 300px;
  box-shadow: ${({ theme }) => theme.shadow.light};

  .stats-wrapper {
    margin: 20px;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
    grid-template-rows: 55px 60px auto;
  }
`;

const StatContainer = ({ children }) => {
  return (
    <StyledStatsContainer>
      <div className="stats-wrapper">{children}</div>
    </StyledStatsContainer>
  );
};
export default StatContainer;
