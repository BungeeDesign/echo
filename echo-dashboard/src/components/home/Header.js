import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Heading from '../layout/Heading';
import Logo from '../layout/Logo';
import SignUp from '../forms/SignUp';
import Globe from '../home/Globe';
import connectedMap from '../../assets/images/home/connected-map.svg';

const hueRotate = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(180deg);
  }
`;

const StyledHeader = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: white;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  place-items: center;
  margin-top: 50px;
  /* background-color: ${({ theme }) => theme.colors.purpleBlue}; */

  .header-text {
    display: flex;
    width: 100%;
    flex-flow: column;
    align-self: center;
    justify-content: center;
    align-items: center;
  }
  .large-heading {
    margin-top: 100px;
    font-size: 3.5rem;
    color: ${({ theme }) => theme.colors.purpleBlue};
  }
  .header-image {
    width: 100%;
    text-align: center;
  }

  .about-section {
    width: 100%;
    height: 100vh;
    text-align: center;
    background: linear-gradient(to top, ${({ theme }) =>
      theme.colors.purpleBlue} 70%, rgba(0, 0, 0, 0) 90%);
    margin-top: 50px;
  }

  .about-content {
    margin: 20px;

    p {
      font-size: 1.3rem;
    }
  }

  .content-body {
    justify-content: center;
    align-self: center;
    text-align: left;
    width: 1200px;
    margin: 230px auto;
    display: flex;
  }

  .body-image {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    margin-left: 50px;
    img {
      width: 600px;
      /* animation: ${hueRotate} ease 9s alternate-reverse infinite;  */
    }
  }
`;

const Header = ({ children, small, subtle }) => {
  return (
    <StyledHeader small={small} subtle={subtle}>
      <div className="header-text">
        <Logo large />
        <Heading>ECHO</Heading>
      </div>
      <div className="about-section">
        <div className="about-content">
          <h1 className="large-heading">Humanitarian Communication</h1>
          <div className="content-body">
            <div>
              <p>
                Echo is a intelligent communication and monitoring system. In
                the event of a naturual disaster where communication is
                comprimised, Echo can help to connect those that are in need.
                With the recent events of COVID-19 Echo is the perfect platform
                to monitor and help those in need.
              </p>

              <Heading>Innovative Technology</Heading>
              <p>
                Echo is the first of its kind and new system built to save lives
                when times are tough. Users download the app via the locally
                deployed Echo hub. A on-boarding process makes things easy for
                users to ingest there informaiton.
              </p>

              <div className="signup-form">
                <Heading>Sign Up</Heading>
                <SignUp />
              </div>
            </div>
            <div className="body-image">
              <img src={connectedMap} />
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
