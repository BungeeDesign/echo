import React from 'react';
import styled, { css } from 'styled-components';
import EchoLogo from '../../assets/images/echo-symbol.svg';

const StyledImage = styled.img`
  width: 100%;
  max-width: 20px;

  ${({ large }) =>
    large &&
    css`
      max-width: 100px;
    `}
`;

const Logo = ({ large }) => {
  return <StyledImage src={EchoLogo} large={large} />;
};

export default Logo;
