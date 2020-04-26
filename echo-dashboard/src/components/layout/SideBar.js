import React from "react";
import styled from "styled-components";

const NavBar = styled.div`
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.lightOrange} 0%,
    #e47756 100%
  );
  display: grid;
  grid-template-rows: 1fr repeat(4, auto) 1fr;
  width: 100px;
  height: 100vh;
  border-top-right-radius: ${({ theme }) => theme.radius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.radius.medium};
  justify-content: center;
  text-align: center;
`;

const SideBar = ({ children }) => {
  return <NavBar>{children}</NavBar>;
};

export default SideBar;
