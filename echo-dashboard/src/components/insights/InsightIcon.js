import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import insightBulb from '../../assets/images/insights-bulb.png';
import Heading from '../layout/Heading';
import useInsights from '../../utils/hooks/useInsights';
import InsightItem from '../insights/InsightItem';

const insightIn = keyframes`
  0% {
    transform: translateY(-15px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  .insight-bulb {
    width: 40px;
  }

  .insight-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.darkOrange};
    color: white;
    font-size: 1rem;
    margin-bottom: -34px;
    z-index: 3;
    transition: 0.5s ease;

    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
`;

const InsightModal = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 150px;
  right: 50px;
  width: 400px;
  height: 250px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: linear-gradient(180deg, #23354f94 0%, #1b2a40ab 100%);
  backdrop-filter: blur(10px);

  ${({ showInsights }) =>
    showInsights &&
    css`
      animation: ${insightIn} ease 0.5s forwards;
    `}

  .insight-container {
    margin: 20px;
  }

  .insights {
    position: relative;
  }

  .empty-insights {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
  }
`;

const InsightIcon = ({ users }) => {
  const insights = useInsights(users);

  const [showInsights, setShowInsights] = useState(false);
  const [userInsights, setUserInsights] = useState([]);

  useEffect(() => {
    setUserInsights(insights);
  }, [users]);

  const removeInsight = (message) => {
    setUserInsights(
      userInsights.filter((insight) => insight.insightMessage !== message)
    );
  };

  return (
    <>
      {showInsights && (
        <InsightModal showInsights={showInsights}>
          <div className="insight-container">
            <Heading>Insights</Heading>
            <div className="insights">
              {userInsights.map((insight, index) => (
                <InsightItem
                  key={index}
                  message={insight.insightMessage}
                  handleDelete={removeInsight}
                />
              ))}

              {userInsights.length === 0 && (
                <div className="empty-insights">
                  <Heading small subtle>
                    All caught up! 😃
                  </Heading>
                </div>
              )}
            </div>
          </div>
        </InsightModal>
      )}
      <StyledIcon
        onClick={() => setShowInsights((showInsights) => !showInsights)}
      >
        <div className="insight-badge">
          <strong>{userInsights.length}</strong>
        </div>
        <img src={insightBulb} className="insight-bulb" />
      </StyledIcon>
    </>
  );
};

export default InsightIcon;
