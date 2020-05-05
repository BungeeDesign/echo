import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ActionButton from '../layout/buttons/ActionButton';
import { useSpring, animated } from 'react-spring';

const itemOut = keyframes`
  0% {
    transform: translateX(0px);
    opacity: 1;
  }

  100% {
    transform: translateX(50px);
    opacity: 0;
  }
`;

const StyledItem = styled(animated.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.colors.purpleBlue};
  border-radius: ${({ theme }) => theme.radius.small};
  position: absolute;

  .item-container {
    margin: 20px;
    color: white;
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    margin: 7px;
  }
`;

const InsightItem = ({ message, handleDelete }) => {
  const [removeItem, setRemoveItem] = useState(false);

  const handleDismiss = () => {
    setRemoveItem(!removeItem);

    // Call Parerent Function
    setTimeout(() => {
      handleDelete(message);
    }, 1000);
  };

  const handleYes = () => {
    console.log('Send...');
  };

  const [props, set, stop] = useSpring(
    () => (
      { config: { mass: 1, tension: 120, friction: 12 } },
      { transform: 'translateX(0px)', opacity: 1 }
    )
  );
  set({
    transform: removeItem ? 'translateX(50px)' : 'translateX(0px)',
    opacity: removeItem ? 0 : 1,
  });

  return (
    <StyledItem message={message} style={props}>
      <div className="item-container">{message}</div>
      <div className="btn-container">
        <ActionButton content="Yes" onClick={() => handleYes()} />
        <ActionButton content="Dismiss" onClick={() => handleDismiss()} />
      </div>
    </StyledItem>
  );
};

export default InsightItem;
