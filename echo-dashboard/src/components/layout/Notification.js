import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const notificationIn = keyframes`
  0% {
    opacity: 1;
    transform: translateX(-250px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const notificationOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0px);
  }

  100% {
    opacity: 1;
    transform: translateX(-250px);
  }
`;

const NotificationCard = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  text-align: center;
  background: linear-gradient(180deg, #23354f94 0%, #1b2a40ab 100%);
  backdrop-filter: blur(10px);
  width: 200px;
  height: 70px;
  border-radius: ${({ theme }) => theme.radius.small};
  align-items: center;
  color: white;
  margin-left: 10px;
  margin-top: 27px;
  animation: ${notificationIn} ease 0.8s forwards;
  ${({ notficationEntered }) =>
    notficationEntered &&
    css`
      animation: ${notificationOut} ease 0.8s forwards;
    `}
`;

const Notification = ({ children }) => {
  const [notficationEntered, setNotficationEntered] = useState(false);

  setTimeout(() => {
    setNotficationEntered(true);
  }, 2500);

  return (
    <NotificationCard notficationEntered={notficationEntered}>
      {children}
    </NotificationCard>
  );
};

export default Notification;
