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

const Text = ({ header, description, color, pre }) => (
  <Container centrate>
    <Wrapper col>
      <Fade>
        <Header
          color={color && color.title}
          style={{ fontWeight: 'bold' }}
        >
          {header}
        </Header>
        <Fade delay={100}>
          {
            description.md ?
              <Paragraph
                pre={pre}
                color={color && color.paragraph}
              >
                {description.md.rawMarkdownBody}
              </Paragraph> :
              description
          }
        </Fade>
      </Fade>
    </Wrapper>
  </Container>
)

const SectionText = ({ header, description, color, padding, pre }) => (
  <Background
    padding={padding}
    color={color}
  >
    <Text
      pre={pre}
      header={header}
      description={description}
      color={color}
    />
  </Background>
)


SectionText.defaultProps = {
  pre: false
}


export default SectionText