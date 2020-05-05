import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: white;
  color: ${({ theme }) => theme.colors.purpleBlue};
  box-shadow: ${({ theme }) => theme.shadow.light};
  padding: 10px;
  transition: opacity ease 0.5s;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const ActionButton = ({ content, onClick }) => {
  return (
    <StyledButton content={content} onClick={onClick}>
      {content}
    </StyledButton>
  );
};

export default ActionButton;
