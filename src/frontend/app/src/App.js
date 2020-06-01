import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/shared/PrivateRoute';
import LoadingIndicator from './components/shared/LoadingIndicator';
import LandingPage from './components/home/LandingPage';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import OAuth2RedirectHandler from './components/authentication/OAuth2RedirectHandler';
import Console from './components/console/Console';
import Error404 from './components/shared/Error404';
import Header from './components/home/Header';
import Footer from './components/home/Footer';

import { ACCESS_TOKEN } from './CONSTANTS';
import Alert from 'react-s-alert';
import { getCurrentUser } from './libs/APIUtils';

//redux
import { connect } from 'react-redux'

//action
import { goToDashboard } from './actions'

class LoginComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <><Header {...this.props}/><Login {...this.props}/></>
    )
  }
}

class SignupComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <><Header {...this.props}/><Signup {...this.props}/></>
    )
  }
}

class ErrorComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <><Header {...this.props}/><Error404 {...this.props}/></>
    )
  }
}

class App extends Component {

  //Call to saga to retrieve the cookie of session.
  //If present, check with the server. If correct,
  //we go directly to /console.
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
      loadUser: false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
      accessToken: null,
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {

    if(this.state.loading) {
      return <LoadingIndicator />
    }
    
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage}/>

            <Route path="/login" component={LoginComponent}/>

            <Route path="/signup" component={SignupComponent}/>

            <PrivateRoute 
              path="/console/me" 
              authenticated={this.state.authenticated} 
              currentUser={this.state.currentUser}
              component={Console}>
            </PrivateRoute>

            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
            
            <Route path="*" component={ErrorComponent}/>

          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadUser: state.loadUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToDashboard: () => {dispatch(goToDashboard())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
