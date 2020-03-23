import React from 'react'

import styled, { css } from 'styled-components'
import { GoMarkGithub } from "react-icons/go";

import { Container } from '../../assets/js'
import { flex, rem, phone } from '../../assets/js/utils'

const Wrapper = styled.footer`
  ${flex({ x: 'space-between', y: 'center' })}
  flex-direction: column;
  padding: 0 ${rem(20)} ${rem(10)};
  height: 100px;
  width: 100%;
  ${phone(css`
    flex-direction: column;
  `)}
`

const linkStyles = css`
  color: #02c39a;
  padding: ${rem(4)};
`

const ExternalLink = styled.a.attrs(({ to }) => ({
  href: to
}))`
  ${linkStyles}
  font-size: ${rem(16)};
`

const Section = styled(Container)`
  ${phone(css`
    flex-direction: column;
    justify-content: center;
  `)}
`

const Copyright = styled.span`
  text-align: center;
  color: #02c39a;
  font-size: ${rem(10)};
  margin-bottom: ${rem(4)};
`

const SocialBlock = styled.div`
  order: 2;
  ${phone(css`
    order: 1;
  `)}
`

const LinksSocial = () => (
  <SocialBlock>
        <ExternalLink
            key="source"
            title="source"
            to="https://github.com/gabrielmougard/greengourmet"
        >
        <GoMarkGithub />
      </ExternalLink>
  </SocialBlock>
)

const Footer = () => (
    <>
        <Wrapper>
            <Section
                size={{ w: '100%', h: '100%' }}
                position={{ x: 'space-between', y: 'center' }}
            >
            <LinksSocial />
            </Section>
            <Copyright>
            © 2020 GreenGourmet. All rights reserved.
            </Copyright>
        </Wrapper>
    </>
    
  

)

export default Footer
