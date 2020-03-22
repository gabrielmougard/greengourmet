import styled, { css } from 'styled-components'
import { phone } from '../../assets/js/utils'

import logoMobile from '../../assets/svg/logoSimple.svg'
import logoWhite from '../../assets/svg/AssembledWhite.svg'
import logoBlack from '../../assets/svg/AssembledBlack.svg'

const Logo = styled.div`
    background: url(${({ transparent }) => (
    transparent ? logoWhite : logoBlack
    )});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    width: 210px;
    height: 50px;
    
    ${phone(css`
        background: url(${logoMobile});
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
    `)}
    transition: all .3s ease-in;
`

export default Logo;