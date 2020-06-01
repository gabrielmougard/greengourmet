import React, { Component } from "react";
import styled, { css } from 'styled-components'
import StartPageBackground from '../backgrounds/pageStart'
import { phone } from '../../assets/js/utils'

import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import './Login.css'

import logo from '../../assets/svg/nameWhite.svg'

import { Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import { signup } from '../../libs/APIUtils';

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

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordCheck: ""
        }

        this.handleSignup = this.handleSignup.bind(this);
        
    }

    handleSignup() {
        if (this.state.password == this.state.passwordCheck) {
            const signupRequest = {name: this.state.name, email: this.state.email, password: this.state.password};

            signup(signupRequest)
            .then(response => {
                Alert.success("Vous avez bien été enregistré ! Connectez vous pour continuer !");
                this.props.history.push("/");
                
            }).catch(error => {
                Alert.error((error && error.message) || "Oups ! Une erreur s'est produite.");
            })
        } else {
            Alert.error('Les mots de passe sont différents !');
        }
    }

    render() {

        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/console/me",
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
                        title="Signup"
                    >
                        <StyledBody>
                        <Input
                            placeholder="nom d'utilisateur"
                            onChange={event => this.setState({name: event.currentTarget.value})}
                            value={this.state.name}
                        />
                        <br />
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
                        <Input
                            placeholder="mot de passe (encore)"
                            onChange={event => this.setState({passwordCheck: event.currentTarget.value})}
                            type="password"
                            value={this.state.passwordCheck}
                        />
                        <br />
                        </StyledBody>
                        <StyledAction>
                            <div>
                                <Button onClick={this.handleSignup} id="signup-button" overrides={{BaseButton: {style: {width: '100%'}}}}>
                                    Sign up
                                </Button>
                            </div>
                        </StyledAction>
                    </Card>
                </div>
                    
            </Wrapper>
        )
    }
}

export default Signup;