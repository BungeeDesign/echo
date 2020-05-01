import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBirthdayCake,
  faVenusMars,
  faNotesMedical,
  faBaby,
  faPizzaSlice,
  faHouseUser,
  faLifeRing,
} from '@fortawesome/free-solid-svg-icons';
import Heading from './Heading';

const StyledItem = styled.div`
  width: 420px;
  height: 150px;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ theme }) => theme.colors.blue};

  .item-container {
    display: grid;
    grid-template-columns: repeat(2, 30px 1fr);
    grid-row-gap: 5px;
    margin: 10px;
    color: white;
  }

  .name-title {
    font-size: 1.2rem;
    color: white;
    margin: 10px;
  }
`;

const StatItem = ({
  user: {
    userDetails: { gender, pregnant, name, age, adultsWith, minorsWith },
    stats: {
      health: { complications },
      food,
      shelter,
      trapped,
    },
    sos: { active, message },
  },
}) => {
  const formatComplications = () => {
    if (complications.length > 1) {
      return `${complications[1]} +${complications.length - 1}`;
    } else if (complications.length === 0) {
      return '0';
    } else {
      return complications;
    }
  };

  return (
    <StyledItem>
      <div className="name-title">
        <strong>{name}</strong>
      </div>
      <div className="item-container">
        <FontAwesomeIcon icon={faBirthdayCake} />
        <Heading small subtle>
          {age}
        </Heading>
        <FontAwesomeIcon icon={faVenusMars} />
        <Heading small subtle>
          {gender}
        </Heading>

        <FontAwesomeIcon icon={faNotesMedical} />
        <Heading small subtle>
          {formatComplications()}
        </Heading>
        <FontAwesomeIcon icon={faBaby} />
        <Heading small subtle>
          {pregnant ? 'Pregnant' : minorsWith}
        </Heading>
        <FontAwesomeIcon icon={faUser} />
        <Heading small subtle>
          {adultsWith}
        </Heading>
        <FontAwesomeIcon icon={faPizzaSlice} />
        <Heading small subtle>
          {food}
        </Heading>
        <FontAwesomeIcon icon={faHouseUser} />
        <Heading small subtle>
          {shelter ? 'Has Shelter' : 'No Shelter'}
        </Heading>
        <FontAwesomeIcon icon={faLifeRing} />
        <Heading small subtle>
          {active ? 'SOS Active' : 'SOS Not Active'}
        </Heading>
      </div>
    </StyledItem>
  );
};
export default StatItem;
