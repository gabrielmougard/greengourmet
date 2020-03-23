import React from 'react'
import styled, { css } from 'styled-components'
import Fade from 'react-reveal/Fade'

import { Container, Header, Paragraph } from '../../assets/js'
import { phone } from '../../assets/js/utils'

const Background = styled.section`
  ${({ color }) => color && color.background && css`
    background: ${({ theme }) => theme[color.background]};
  `}
  padding: ${({ padding }) => padding || '14vh 0'};
  display: flex;
  flex-direction: column;
`

const Wrapper = styled(Container)`
  width: 60%;
  text-align: center;
  ${phone(css`
    width: 85%;
  `)}
`

const Text = () => (
  <Container centrate>
    <Wrapper col>
      <Fade>
        <Header
          color="#02c39a"
          style={{ fontWeight: 'bold' }}
        >
          Imagines une plateforme qui gère ton frigo de la manière la plus optimisée possible...
        </Header>
        <Fade delay={100}>
          <Paragraph pre={true} color="#a1a1a1">
          Avec GreenGourmet, vous pouvez désormais :
          </Paragraph>
          <Paragraph pre={true} color="#a1a1a1">
          gérer vos inventaires de courses, avoir des propositions de recettes guidées en fonction du contenu de votre frigo, 
          </Paragraph>
          <Paragraph pre={true} color="#a1a1a1">
          mesurer vos performances de chef cuisto avec vos amis et encore bien plus !
          </Paragraph>
        </Fade>
      </Fade>
    </Wrapper>
  </Container>
)

const SectionText = () => (
  <Background
    padding='14vh 0 4vh'
    color={false}
  >
    <Text
      header="Imagines une plateforme qui gère ton frigo de la manire la plus optimisée possible..."
      description="Avec GreenGourmet, vous pouvez désormais : gérer vos inventaires de courses, avoir des propositions de recettes guidées\n en fonction du contenu de votre frigo, mesurer vos performances de chef cuisto avec vos amis et encore bien plus !"
    />
  </Background>
)

export default SectionText