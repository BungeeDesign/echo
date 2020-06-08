import React from 'react';
import styled from 'styled-components';
import Heading from '../layout/Heading';
import StatContainer from '../layout/StatContainer';

const UserAlerts = () => {
  return (
    <StatContainer>
      <Heading>Alerts</Heading>
      <Heading small subtle>
        There are currently no alerts.
      </Heading>
    </StatContainer>
  );
};
export default UserAlerts;
