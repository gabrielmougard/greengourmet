import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components'
import { withRouter, Link } from "react-router-dom";
import { flex, rem, phone } from '../../assets/js/utils'
import { Button } from '../../assets/js'

import Logo from './Logo';

const Wrapper = styled.header`
  ${flex({ x: 'space-between', y: 'center' })}
  padding: 0 ${rem(20)};
  height: ${rem(70)};
  position: fixed;
  width: 100%;
  z-index: 9;
  background: transparent;
  ${({ transparent }) => !transparent && css`
    box-shadow: 0 2px 20px rgba(0,0,0,0.17);
    background: #fff;
  `}
  transition: all .4s ease;
`

const Nav = styled.nav`
  ${flex}
  button, a {
    &:not(:last-child) {
      margin: 0.5rem 1rem;
    }
    ${phone(css`
      font-size: ${rem(12)};
      padding: 0.25rem 0.5rem;
    `)}
  }
`

class Header extends Component {
    state = {
        transparent: true
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll)
    
    }
    handleScroll = () => {
        if (window.scrollY > 0) {
          this.setState({ transparent: false })
          return
        }
        this.setState({ transparent: true })
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }
    render() {
        const { transparent } = this.state

        return (
            <Wrapper transparent={transparent}>
                <Logo
                    onClick={() => {this.props.history.push('/')}}
                    transparent={transparent}
                />
                <Nav>
                    <Fragment>
                      <Button onClick={() => { this.props.history.push('/console/me')}}>Mon frigo</Button>
                      <Button onClick={() => { this.props.history.push('/login')}}>Connexion</Button>     
                    </Fragment>  
                </Nav>
            </Wrapper>
        )
    }
}

export default Header;