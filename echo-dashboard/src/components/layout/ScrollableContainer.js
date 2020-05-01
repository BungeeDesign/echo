import React, { useRef, useEffect, useContext } from 'react';
import UserContext from '../../context/user/userConext';
import styled from 'styled-components';

const StyledScroll = styled.div`
  width: 100%;
  height: 165px;
  overflow-y: scroll;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  transition: all 0.5s ease;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(27, 42, 64, 0.4);
    border-radius: 100px;
  }
`;

const ScrollableContainer = ({ children }) => {
  const scrollContainer = useRef(null);

  const userContext = useContext(UserContext);
  const { scrollPosition } = userContext;

  useEffect(() => {
    getScrollData();
  });

  const getScrollData = () => {
    scrollContainer.current.scroll({
      top: scrollPosition,
      left: 0,
      behavior: 'smooth',
    });
  };

  return <StyledScroll ref={scrollContainer}>{children}</StyledScroll>;
};
export default ScrollableContainer;
