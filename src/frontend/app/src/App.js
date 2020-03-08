import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Console from './components/Console';
import Error404 from './components/Error404';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/console">
            <Console />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
