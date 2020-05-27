import React from 'react';
import UserState from '../context/user/UserState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBell,
  faEnvelope,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import Wrapper from '../components/layout/Wrapper';
import SideBar from '../components/layout/SideBar';
import SideBarItem from '../components/layout/SideBarItem';
import DashboardContainer from '../components/layout/DashboardContainer';
import Logo from '../components/layout/Logo';
import UserStats from '../components/users/UserStats';
import UserAlerts from '../components/alerts/UserAlets';
import UserMessages from '../components/messages/UserMessages';
import DashboardMap from '../components/map/DashboardMap';
import GlobalStyle from '../theme/globalStyle';
import { motion } from 'framer-motion';

function Dashboard(props) {
  return (
    <motion.div
      inital={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <UserState>
        <GlobalStyle />
        <Wrapper>
          <SideBar>
            <SideBarItem logo>
              <Logo />
            </SideBarItem>
            <SideBarItem>
              <FontAwesomeIcon icon={faChartLine} />
            </SideBarItem>
            <SideBarItem>
              <FontAwesomeIcon icon={faBell} />
            </SideBarItem>
            <SideBarItem>
              <FontAwesomeIcon icon={faEnvelope} />
            </SideBarItem>
            <SideBarItem>
              <FontAwesomeIcon icon={faCog} />
            </SideBarItem>
          </SideBar>
          <DashboardContainer>
            <UserStats />
            <UserMessages />
            <UserAlerts />
            <DashboardMap />
          </DashboardContainer>
        </Wrapper>
      </UserState>
    </motion.div>
  );
}

export default Dashboard;
