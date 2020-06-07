import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Heading from '../layout/Heading';
import StatContainer from '../layout/StatContainer';
import MessageBubble from '../messages/MessageBubble';
import ScrollableContainer from '../layout/ScrollableContainer';
import UserContext from '../../context/user/userConext';

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 130px;

  .scrollableContainer {
    width: 100%;
    height: 165px;
    overflow-y: scroll;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    transition: all 0.5s ease;
    padding-bottom: 20px;

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
  }
`;

const UserMessages = () => {
  const userContext = useContext(UserContext);
  const { getMessages, messages, hasMessages } = userContext;

  const [userID, setUserID] = useState('');
  // const [hasMessages, setHasMessages] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    setInterval(() => {
      getMessages();
    }, 2500);
  }, []);

  return (
    <StatContainer>
      <Heading>Messages</Heading>
      <MessageContainer>
        {hasMessages ? (
          <div className="scrollableContainer">
            {messages[0].messages.map((message, index) => (
              <MessageBubble
                key={index}
                type={message.type}
                messageBody={message.message}
              />
            ))}
          </div>
        ) : (
          <Heading small>You currently don't have any messages ✉️</Heading>
        )}
      </MessageContainer>
    </StatContainer>
  );
};
export default UserMessages;
