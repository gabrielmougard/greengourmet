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
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_OAUTH2_CLIENT_ID } from '../../CONSTANTS';

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
const responseGoogle = (response) => {
    console.log(response);
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passwordValue: "",
        }
    }
    render() {
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
                            placeholder="username (ou email)"
                        />
                        <br />
                        <Input
                            placeholder="mot de passe"
                            onChange={event => this.setState({passwordValue: event.currentTarget.value})}
                            type="password"
                            value={this.state.passwordValue}
                        />
                        <br />
                        </StyledBody>
                        <StyledAction>
                            <div>
                                <Button id="login-button" overrides={{BaseButton: {style: {width: '100%'}}}}>
                                    Login
                                </Button>
                                <Button id="signup-button" overrides={{BaseButton: {style: {width: '100%'}}}}>
                                    Sign up
                                </Button>
                            </div>
                            
                            <p className="divider-login-center"> Or connect with </p>
                            <GoogleLogin
                                clientId={GOOGLE_OAUTH2_CLIENT_ID}
                                render={() => (
                                    <img src={googleLogo} width={30} height={30}/>
                                )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            
                        </StyledAction>
                    </Card>
                </div>
                    
            </Wrapper>
        )
    }
}

export default Login;