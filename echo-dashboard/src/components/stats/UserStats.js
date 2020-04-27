import React from "react";
import styled from "styled-components";
import Heading from "../layout/Heading";

const StyledStatsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-radius: ${({ theme }) => theme.radius.medium};
  width: 400px;
  height: 300px;
  margin-left: 50px;
  margin-top: 50px;
`;

const StyledContent = styled.div`
  margin: 20px;
`;

const UserStats = () => {
  return (
    <StyledStatsContainer>
      <StyledContent>
        <Heading>Users</Heading>
      </StyledContent>
    </StyledStatsContainer>
  );
};
export default UserStats;
