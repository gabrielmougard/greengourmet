import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import { scroller } from 'react-scroll'

import StartPageBackground from '../backgrounds/pageStart'
import phonelogo from '../../assets/svg/iphone-x.svg';

import { rem, flex, phone, mobile } from '../../assets/js/utils'
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

${phone(css`
  display: block;
  height: auto;
`)}
`

const Content = styled(Container)`
  padding: ${rem(40)};
  display: flex;
  flex: 1;

  ${phone(css`
    padding: ${rem(30)} ${rem(16)};
    text-align: center;
  `)}
`

const IconWrapper = styled.div`
  position: absolute;
  bottom: ${rem(50)};
  width: 100%;
  ${flex}

  ${phone(css`
    display: none;
  `)}
`

const TextWrapper = styled.div`
  flex: 7;
  padding: ${rem(30)} 0;

  ${mobile(css`
    h1 {
      font-size: ${rem(52)};
    }

    h3 {
      font-size: ${rem(18)};
    }
  `)}

  ${phone(css`
    order: 1;

    h2, h3 {
      font-size: ${rem(16)};
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

  ${phone(css`
    order: 2;
    padding-right: 0;

    ${flex({ x: "center", y: 'flex-start' })};

  `)}
`

const StaticImage = styled.div`
  min-width: 340px;

  ${({ id }) => id === 'home' && css`
    cursor: pointer;
  `}

  ${phone(css`
    transform: none;

    ${({ id }) => id === 'home' && css`
      transform: translateX(14px);
    `}
  `)}

  transition: transform .2s ease-in;
`

export const ConsoleButton = styled(Button)`
  margin-top: ${rem(30)};

  ${phone(css`
    margin-bottom: ${rem(40)};
  `)}
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
          onClick={() => scrollToForm()}
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
          <img id="iphone-wrapper" src={image}/>
          <Scanner onDetected={onResultDetected} />
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
      <Wrapper>
        <StartPageBackground />
        <Content>
            <Image
                id="home"
                image={phonelogo}
            />
            <Text
                header='Tu as faim ? Pourquoi attendre ? Prends-toi un GreenGourmet' 
                subHeader="Reprends le contrôle de ton frigo !"
                description="La première application de gestion et de création d'une cuisine plus écologique, économique et créative !"
                button="J'y vais !" 
            />
        </Content>
        <IconWrapper></IconWrapper>
      </Wrapper>
      )
    }
};
  
export default Hero;