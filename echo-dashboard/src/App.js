import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserState from './context/user/UserState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBell,
  faEnvelope,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import Wrapper from './components/layout/Wrapper';
import SideBar from './components/layout/SideBar';
import SideBarItem from './components/layout/SideBarItem';
import DashboardContainer from './components/layout/DashboardContainer';
import Logo from './components/layout/Logo';
import UserStats from './components/users/UserStats';
import UserAlerts from './components/alerts/UserAlets';
import UserMessages from './components/messages/UserMessages';
import DashboardMap from './components/map/DashboardMap';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>Login</h1>
          </Route>
          <Route path="/dashboard">
            <UserState>
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
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
