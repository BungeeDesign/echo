import React from 'react';
import styled, { css } from 'styled-components';
import Heading from '../layout/Heading';
import StatContainer from '../layout/StatContainer';

const StyledContainer = styled.div`
  display: grid;
  margin-top: 20px;
  width: 400px;
  height: fit-content;
  border-radius: ${({ theme }) => theme.radius.small};
  background: ${({ theme, type }) =>
    type === 'admin' ? theme.colors.purpleBlue : theme.colors.blue};
  transition: ease 0.6s;

  &:hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.strong};
  }

  ${({ type }) =>
    type === 'user' &&
    css`
      background: linear-gradient(
        180deg,
        ${({ theme }) => theme.colors.lightOrange} 0%,
        #e47756 100%
      );
    `}
  padding: 10px;

  .messageInfo {
    display: flex;
    height: 20px;
  }

  .messageContent {
    font-family: ${({ theme }) => theme.fonts.body};
    color: white;
    margin-top: 10px;
  }
`;

const MessageBubble = ({ type, messageBody, toggleForm }) => {
  return (
    <StyledContainer type={type} onClick={toggleForm}>
      <div className="messageInfo">
        <Heading small subtle right>
          {type === 'admin' ? 'You' : 'User'}
        </Heading>
        <Heading small subtle right>
          1.4M From Echo Peach
        </Heading>
      </div>
      <div className="messageContent">{messageBody}</div>
    </StyledContainer>
  );
};
export default MessageBubble;
