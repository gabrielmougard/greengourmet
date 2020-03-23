import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from './components/home/LandingPage';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Console from './components/console/Console';
import Error404 from './components/shared/Error404';
import Header from './components/home/Header';
import Footer from './components/home/Footer';

function App() {

  //Call to saga to retrieve the cookie of session.
  //If present, check with the server. If correct,
  //we go directly to /console.

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/login">
            <Header />
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
