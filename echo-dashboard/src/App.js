import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AuthContext } from './context/auth/auth';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  const exsistingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(exsistingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </AnimatePresence>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
