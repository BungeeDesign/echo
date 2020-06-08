import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Heading from '../layout/Heading';
import StatContainer from '../layout/StatContainer';
import MessageBubble from '../messages/MessageBubble';
import UserContext from '../../context/user/userConext';
import { useForm } from 'react-hook-form';
import API from '../../utils/API';

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

const MessageWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 100px;
  z-index: 9999;

  form {
    display: grid;
    grid-template-columns: 1fr;
    height: 100px;
  }

  button {
    outline: 0;
    border: 0;
    cursor: pointer;
    grid-column: span 2;
    background-color: ${({ theme }) => theme.colors.oceanBlue};
    color: white;
    font-size: 1.1rem;
    padding: 4px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.shadow.light};
    overflow: hidden;
    position: relative;

    :hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }

  textarea {
    outline: 0;
    border: 0;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: white;
    font-size: 1.1rem;
    padding: 20px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.shadow.light};
    font-family: ${({ theme }) => theme.fonts.heading} !important;

    ::placeholder {
      color: ${({ theme }) => theme.colors.lightBlue};
    }
  }
`;

const UserMessages = () => {
  const userContext = useContext(UserContext);
  const { getMessages, messages, hasMessages } = userContext;
  const { register, handleSubmit, errors } = useForm();

  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setInterval(() => {
      getMessages();
    }, 2500);
  }, []);

  const onSubmit = async (data) => {
    // Format object ready to send as a message
    const userID = JSON.parse(localStorage.getItem('admin'));
    const messageObject = {
      id: '5ed93da63a23b85ff9cfe340',
      message: {
        user: userID,
        message: data.message,
        type: 'admin',
      },
    };
    try {
      const res = await API.put('/messages/message', messageObject);

      if (res.data.msg === 'sent') {
        toggleForm();
      } else {
        alert('Your message could not be sent, please try again later.');
      }
    } catch (error) {
      console.log('[API Request Error] - Could not send message', error);
    }
  };

  const toggleForm = () => {
    setFormVisible((isFormVisible) => !isFormVisible);
  };

  return (
    <StatContainer>
      <Heading>Messages</Heading>
      <MessageContainer>
        {hasMessages ? (
          <div className="scrollableContainer">
            {messages[0].messages.map((message, index) => (
              <MessageBubble
                toggleForm={toggleForm}
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
      {isFormVisible && (
        <MessageWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              name="message"
              ref={register({ required: true, maxLength: 500 })}
            />

            <button type="submit">Send</button>
          </form>
        </MessageWrapper>
      )}
    </StatContainer>
  );
};
export default UserMessages;
