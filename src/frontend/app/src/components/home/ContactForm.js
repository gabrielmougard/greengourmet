import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'
import { isEmail, isEmpty } from 'validator'
import Fade from 'react-reveal/Fade'

import EndPageBackground from './pageEnd'

import { Container, Header, Paragraph, Button } from '../../assets/js'
import { flex, rem, phone } from '../../assets/js/utils'

const Submit = styled(Button)`
  margin-top: ${rem(30)};
  ${phone(css`
    margin-bottom: ${rem(40)};
  `)}
`

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
          color="white"
          style={{ fontWeight: 'bold' }}
        >
          Bénéficies de notre offre Alpha
        </Header>
        <Fade delay={100}>
          <Paragraph pre={true} color="#a1a1a1">
          Des propositions de recettes inédites, un suivi temps réel de tes accomplissements personnels...
          </Paragraph>
          <Paragraph pre={true} color="#a1a1a1">
           Enfin bref, tout ce dont à besoin un cuisto écolo !
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
    <Text />
  </Background>
)

const rootWrapper = styled.section`
  height: 1100px;
  padding: 0 0 ${rem(120)};
  position: relative;
  ${flex({ x: 'flex-end' })}
  flex-direction: column;
  ${phone(css`
    height: 1200px;
    text-align: center;
  `)}
`

const Form = styled.form`
  position: relative;
  margin: 0;
  width: 400px;
  ${flex}
  flex-direction: column;
  ${phone(css`
    padding: 0 ${rem(36)};
  `)}
  ${({ blur }) => blur && css`
    filter: blur(2px);
  `}
  transition: all .3s ease;
`

const Input = styled.input`
  font-size: ${rem(14)};
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  width: 100%;
  padding: ${rem(16)};
  margin: ${rem(10)} 0;
  &:focus {
    border-bottom: 1px solid #02c39a};
    box-shadow: inset 0 2px 20px rgba(0,0,0,0.17);
    &::-webkit-input-placeholder {
      color: #02c39a;
      transition: all .3s ease;
    }
  }
  transition: all .3s ease;
`

const Message = styled.p`
  margin: ${rem(6)} 0 0;
  font-size: ${rem(14)};
  color: #c6c6c6;
  ${({ error }) => error && css`
    color: #FF0000;
  `}
`

const SpinWrapper = styled.div`
  position: absolute;
  top: 0;
  background: transparent;
  width: 100%;
  height: 100%;
  ${flex}
`

const Spin = () => (
  <SpinWrapper>
    <Spinner name="ball-triangle-path" color="#02c39a" />
  </SpinWrapper>
)

const DisplayMessage = ({ data }) => {
  let message = data.msg ? data.msg.replace(/([0-9]|-)/g, '').trim() : ''

  if (message.includes('already subscribed')) {
    [ message ] = message.split('<')
  }

  return (
    <Message
      error={data.result && data.result === 'error' && true}>
      {message}
    </Message>
  )
}

DisplayMessage.propTypes = {
  data: PropTypes.shape({
    msg: PropTypes.string,
    result: PropTypes.string
  }).isRequired
}

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    response: null,
    loading: false
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async e => {
    e.preventDefault()
    const { email, name } = this.state

    if (isEmpty(email)) return

    this.setState({ loading: true })

    if (!isEmail(email)) {
      this.setState({
        response: {
          result: "erreur",
          msg: "Ce n'est pas une adresse mail valide."
        },
        loading: false
      })
      return
    }

    //const response = await addToMailchimp(
    //  normalizeEmail(email), { FNAME: !isEmpty(name) && name.trim() }
    //)

    //call to saga to register the mail in our mail list

    //

    this.setState({
      loading: false,
      name: '',
      email: '',
      response: undefined
    })
  }

  render() {
    const { response, loading, name, email } = this.state

    return (
      <>
      <rootWrapper>
        <div style={{ width: '100%' }}>
          <SectionText />
        </div>
        <EndPageBackground />
        <Header color='whiteFont' id='subscribe'>
            Accèdes à l'offre Alpha !
        </Header>
        <div style={{ position: 'relative' }} >
          <fieldset
            disabled={loading}
            style={{ border: 'none' }}
          >
            <Form
              onSubmit={this.handleSubmit}
              blur={loading}
            >
              <Input
                placeholder='Ton nom (optionnel)'
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <Input
                required
                placeholder='Ton adresse mail'
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {response && <DisplayMessage data={response} /> }
              <Submit mint>
                Accès Alpha
              </Submit>
            </Form>
          </fieldset>
          { loading && <Spin /> }
        </div>
      </rootWrapper>
      </>
    )
  }
}

export default ContactForm