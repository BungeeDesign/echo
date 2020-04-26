import React from "react";
import styled, { css } from "styled-components";

const NavBarItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.small};
  width: 50px;
  height: 50px;
  margin: 5px;
  margin-bottom: 40px;
  color: white;
  opacity: 0.5;
  font-size: 2rem;
  cursor: pointer;
  transition: ease 0.5s;
  ${({ logo }) =>
    logo &&
    css`
      margin-top: 40px;
      opacity: 1;
    `}

  ${({ logo }) =>
    !logo &&
    css`
      &:hover {
        opacity: 1;
        background-color: rgb(255, 255, 255, 0.2);
      }
    `}
`;

const SideBarItem = ({ children, logo }) => {
  return <NavBarItem logo={logo}>{children}</NavBarItem>;
};

export default SideBarItem;
