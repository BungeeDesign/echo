import React from "react";
import styled from "styled-components";
import EchoLogo from "../../assets/images/echo-symbol.svg";

const StyledImage = styled.img`
  width: 100%;
  max-width: 20px;
`;

const Logo = () => {
  return <StyledImage src={EchoLogo} />;
};

export default Logo;
