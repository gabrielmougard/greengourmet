import React, { Component } from "react";
import styled, { css } from 'styled-components'
import Fade from 'react-reveal/Fade'

import { flex, phone, rem } from '../../assets/js/utils'

import SectionText from './sectionText'
import Divider from './dividerStart'
import LinesDivider from './linesDivider'

//images
import foodImages from '../../assets/images/imagine.jpg'

//CSS
import './Imagine.css'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  transition: height .2s;
  ${flex}
`

const ImageWrapper = styled.div`
  width: ${rem(500)};
  margin-top: 20px;
  ${phone(css`
    width: ${rem(200)};
  `)}
`
const SectionFood = () => (
    <Wrapper>
      <LinesDivider style={{
        marginBottom: 100
      }}/>
      <ImageWrapper>
        <Fade>
          <img className="imagine-food-image" src={foodImages}/>
        </Fade>
        <Divider style={{ zIndex: 1 }}/>
      </ImageWrapper>
    </Wrapper>
)

const Imagine = props => (
    <div id={"imagine"}>
      <SectionText />
      <SectionFood />
    </div>
  )

export default Imagine;