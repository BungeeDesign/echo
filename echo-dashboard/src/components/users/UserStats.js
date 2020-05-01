import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/user/userConext';
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
  // User Context
  const userContext = useContext(UserContext);
  const { getUsers, users } = userContext;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <StatContainer>
      <Heading>Users</Heading>
      <StatCounter>{users.length} Active</StatCounter>

      <ScrollableContainer>
        {users.map((user) => (
          <StatItem key={user._id} user={user} />
        ))}
      </ScrollableContainer>
    </StatContainer>
  );
};
export default UserStats;
