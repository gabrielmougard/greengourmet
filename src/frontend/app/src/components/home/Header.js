import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components'

import { flex, rem, phone } from '../../assets/js/utils'
import { Button } from '../../assets/js'

const Wrapper = styled.header`
  ${flex({ x: 'space-between', y: 'center' })}
  padding: 0 ${rem(20)};
  height: ${({ theme }) => theme.navHeight};
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

const LanguageSwitcher = styled.button`
  background: transparent;
  border: none;
  padding: ${rem(4)} ${rem(12)};
  font-size: ${rem(13)};
  cursor: pointer;
  color: ${({ transparent, theme }) => transparent ? theme.lightFont : theme.black};
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
                    onClick={() => navigate(`${language || ''}/`)}
                    transparent={transparent}
                />
                <Nav>
                    {nav.map(({ name, path, section }) => section === 'header' && (
                        <Fragment key={name}>
                            {name !== 'Whitepaper' ?
                                <Button onClick={() => navigate((language || '') + path)}>{name}</Button> :
                                <Button as='a' href={path}>{name}</Button>
                            }
                        </Fragment>
                    ))}
                    {
                        !location.pathname.match(noTranslate) &&
                        <LanguageSwitcher
                            transparent={transparent}
                            onClick={() => onChangeLanguage()}
                        >
                        {language === "en" ? "中文" : "English"}
                        </LanguageSwitcher>
                    }
                </Nav>
            </Wrapper>
        )
    }
}

export default Header;