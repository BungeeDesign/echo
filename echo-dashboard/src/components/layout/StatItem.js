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

const StatItem = () => {
  return (
    <StyledItem>
      <div className="name-title">
        <strong>James</strong>
      </div>
      <div className="item-container">
        <FontAwesomeIcon icon={faBirthdayCake} />
        <Heading small subtle>
          34
        </Heading>
        <FontAwesomeIcon icon={faVenusMars} />
        <Heading small subtle>
          Male
        </Heading>

        <FontAwesomeIcon icon={faNotesMedical} />
        <Heading small subtle>
          Fractured Foot
        </Heading>
        <FontAwesomeIcon icon={faBaby} />
        <Heading small subtle>
          1
        </Heading>
        <FontAwesomeIcon icon={faUser} />
        <Heading small subtle>
          0
        </Heading>
        <FontAwesomeIcon icon={faPizzaSlice} />
        <Heading small subtle>
          High
        </Heading>
        <FontAwesomeIcon icon={faHouseUser} />
        <Heading small subtle>
          Has Shelter
        </Heading>
        <FontAwesomeIcon icon={faLifeRing} />
        <Heading small subtle>
          SOS Not Active
        </Heading>
      </div>
    </StyledItem>
  );
};
export default StatItem;
