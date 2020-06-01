import React, { Component } from "react";
import styled, { css } from 'styled-components'
import StartPageBackground from '../backgrounds/pageStart'
import { phone } from '../../assets/js/utils'

import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import './Login.css'

import logo from '../../assets/svg/nameWhite.svg'
import googleLogo from '../../assets/svg/google.svg'

import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from '../../CONSTANTS';
import { Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import { login } from '../../libs/APIUtils';

//redux
import { connect } from 'react-redux'

//actions
import { loadUser } from '../../actions';

const Wrapper = styled.section`height: 100vh;
        padding-top: ${({ theme }) => theme.navHeight};
        position: relative;

        display: flex;
        flex-direction: column;

        ${phone(css`
            display: block;
            height: auto;
        `)}
`

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            signupClicked: false,
            accessToken: null
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignupButton = this.handleSignupButton.bind(this);
    }

    handleLogin() {
        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.loadUser()
            this.props.history.push("/console/me");
            Alert.success("Successfully logged in !");
        }).catch(error => {
            Alert.error((error && error.message) || "Oups ! Une erreur s'est produite.");
        })
    }

    handleSignupButton() {
        this.setState({signupClicked: true})
    }

    render() {
        if (this.props.goToDashboard) {
            this.props.history.push("/console/me")
        }

        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/console/me",
                state: { from: this.props.location }
            }}/>;            
        }

        if(this.state.signupClicked) {
            return <Redirect
                to={{
                pathname: "/signup",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <Wrapper>
                <StartPageBackground />
                <div className="login-wrapper-root">
                    <img src={logo}/>
                </div>
                <div className="login-wrapper">
                    <Card
                        overrides={{Root: {style: {width: '400px'}}}}
                        title="Login"
                    >
                        <StyledBody>
                        <Input
                            startEnhancer="@"
                            placeholder="email"
                            onChange={event => this.setState({email: event.currentTarget.value})}
                            value={this.state.email}
                        />
                        <br />
                        <Input
                            placeholder="mot de passe"
                            onChange={event => this.setState({password: event.currentTarget.value})}
                            type="password"
                            value={this.state.password}
                        />
                        <br />
                        </StyledBody>
                        <StyledAction>
                            <div>
                                <Button onClick={this.handleLogin} id="login-button" overrides={{BaseButton: {style: {width: '100%'}}}}>
                                    Login
                                </Button>
                                <Button onClick={this.handleSignupButton} id="signup-button" overrides={{BaseButton: {style: {width: '100%'}}}}>
                                    Sign up
                                </Button>
                            </div>
                            
                            <p className="divider-login-center"> Or connect with </p>
                            <a href={GOOGLE_AUTH_URL}>
                            <img className="google-button" src={googleLogo} width={30} height={30}/>
                            </a>
                            
                        </StyledAction>
                    </Card>
                </div>
                    
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        goToDashboard: state.goToDashboard,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUser: () => {dispatch(loadUser())},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);