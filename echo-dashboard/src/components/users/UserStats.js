import React from 'react';
import styled from 'styled-components';
import Heading from '../layout/Heading';
import StatContainer from '../layout/StatContainer';
import StatItem from '../layout/StatItem';
import ScrollableContainer from '../layout/ScrollableContainer';

const StatCounter = styled.div`
  color: white;
  font-size: 1.2rem;
  margin: 0px !important;
`;

const UserStats = () => {
  return (
    <StatContainer>
      <Heading>Users</Heading>
      <StatCounter>10 Active</StatCounter>

      <ScrollableContainer>
        <StatItem />
      </ScrollableContainer>
    </StatContainer>
  );
};
export default UserStats;
