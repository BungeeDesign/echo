import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './context/auth/auth';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const exsistingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(exsistingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          authTokens,
          setAuthTokens: setTokens,
        }}
      >
        <AnimatePresence exitBeforeEnter initial={false}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        </AnimatePresence>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
