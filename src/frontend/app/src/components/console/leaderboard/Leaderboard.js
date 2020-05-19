import React, { Component } from 'react';
import styled from 'styled-components'
//images
import wip from '../../../assets/images/wip.png'

const WipWrapper = styled.div`
    top: 50%;
    left: 50%;
    text-align: center;
    padding-top: 150px;
`

const WipImage = styled.img(props => ({
    src: props.src,
    borderRadius: '50px',
    width: '400px',
    height: '400px'
}));


class Leaderboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <WipWrapper>
                <WipImage src={wip}/>
                </WipWrapper>
               
            </>
        )
    }
}

export default Leaderboard;