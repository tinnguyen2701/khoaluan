import React from 'react';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';

export default () => {
  return (
    <ThemeProvider theme={{}}>
      <BrowserRouter>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Admin} />
          <Route path="/login" component={Login} />
        </Router>
      </BrowserRouter>
    </ThemeProvider>
  );
};
