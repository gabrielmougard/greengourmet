import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import { scroller } from 'react-scroll'

import StartPageBackground from '../backgrounds/pageStart'

import { rem, flex, mobile, isPhone } from '../../assets/js/utils'
import { Container, Title, Header, SubHeader, Button } from '../../assets/js/index'

//Scanner
import Scanner from './Scanner';

//CSS
import './Hero.css'

const scrollToForm = () => scroller.scrollTo("subscribe", {
    smooth: true,
    duration: 600,
    offset: -120
})

const Wrapper = styled.section`height: 100vh;
padding-top: ${({ theme }) => theme.navHeight};
position: relative;

display: flex;
flex-direction: column;
`

const Content = styled(Container)`
  padding: ${rem(40)};
  display: flex;
  flex: 1;

`

const IconWrapper = styled.div`
  position: absolute;
  bottom: ${rem(50)};
  width: 100%;
  ${flex}

`

const TextWrapper = styled.div`
  flex: 7;
  padding: ${rem(30)} 0;
  text-align: center;

  ${mobile(css`
    h1 {
      font-size: ${rem(52)};
    }

    h3 {
      font-size: ${rem(18)};
    }
  `)}

`

const ImageWrapper = styled.div`
  flex: 5;
  padding-right: ${rem(40)};
  min-width: 200px;

  ${mobile(css`
    padding: 0;
    flex: 7;
  `)}

`

const StaticImage = styled.div`
  min-width: 340px;

  ${({ id }) => id === 'home' && css`
    cursor: pointer;
  `}

  transition: transform .2s ease-in;
`

export const ConsoleButton = styled(Button)`
  margin-top: ${rem(50)};
`

const Sub = styled(SubHeader)`
  white-space: pre-line;
  color: #f0f3bd};

  ${mobile(css`
    white-space: normal;
  `)}

  p {
    margin: 0
  }
`

const Text = ({ subHeader, header, description, button }) => (
    <TextWrapper>
      <Header
        style={{ margin: `0 0 ${rem(20)}`}}
        color='lightFont'
        size={18}
      >
        {subHeader}
      </Header>
      <Title
        style={{ margin: `0 0 ${rem(20)}` }}
        size={72}
        color="#02c39a"
      >
        {header}
      </Title>
      <div id="greengourmet-title">
        <Title
          style={{ margin: `0 0 ${rem(20)}` }}
          size={72}
          color="#02c39a"
        >
          {"' GreenGourmet '"}
        </Title>
      </div>
      
      <Sub
        style={{ margin: `0 0 ${rem(8)}` }}
        size={18}
      >
        {description}
      </Sub>
      {
        button && button.length &&
        <ConsoleButton
          mint
          onClick={event =>  window.location.href='/console/me'}
        >
          {button}
        </ConsoleButton>
      }
    </TextWrapper>
)
  
Text.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  button: PropTypes.string,
  description: PropTypes.string.isRequired
}
  
const onResultDetected = result => {
  console.log("le result : "+result);
}

const Image = ({ image, id }) => (
  <ImageWrapper id={id}>
    <StaticImage id={id}>
      <div onClick={() => id === 'home' && scrollToForm()}>
        <div className="scanner-wrapper">
          {isPhone() ? (
              <Scanner onDetected={onResultDetected} />
          ) : (
            <>
              <img id="iphone-wrapper" src={image}/>
              <Scanner onDetected={onResultDetected} />
            </>
          )}
        </div>
      </div>
    </StaticImage>
  </ImageWrapper>
)
  
Image.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

class Hero extends Component {

    render() {
      return (
        <div id="hero">
      <Wrapper>
        <StartPageBackground />
        <Content>
         
            <Text
                header='Tu as faim ? Pourquoi attendre ? Prends-toi un' 
                subHeader="Reprends le contrôle de ton frigo !"
                description="La première application de gestion et de création d'une cuisine plus écologique, économique et créative !"
                button="J'y vais !" 
            />
        </Content>
        <IconWrapper></IconWrapper>
      </Wrapper>
      </div>
      )
    }
};
  
export default Hero;