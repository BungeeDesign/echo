import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import Heading from '../layout/Heading';
import StatBar from '../layout/StatBar';

const transitionIn = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0);
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const StyledModal = styled.div`
  & div {
    display: grid;
    justify-content: center;
  }
`;

const MapModal = ({
  user: {
    details: { name, age, status },
  },
}) => {
  const [food, setFood] = useState(0);
  const [health, setHealth] = useState(0);

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    switch (status.food) {
      case 'Low':
        setFood(30);
        break;
      case 'Medium':
        setFood(50);
        break;
      case 'High':
        setFood(100);
        break;
      default:
        break;
    }

    switch (status.health.complications.length) {
      case 0:
        setHealth(100);
        break;
      case 1:
        setHealth(50);
        break;
      case 2:
        setHealth(30);
        break;
      default:
        break;
    }
  };

  return (
    <StyledModal>
      <div>
        <Heading small>{`${name} ${age}`}</Heading>
      </div>
      <StatBar percent={health}>
        <FontAwesomeIcon icon={faHeartbeat} />
      </StatBar>
      <StatBar percent={food}>
        <FontAwesomeIcon icon={faLemon} />
      </StatBar>
    </StyledModal>
  );
};

export default MapModal;
