import React, { Component } from 'react';
import Article from './articleCard';
import styled from 'styled-components'
import { Typography } from '@material-ui/core';

//images
import fridgeImage from '../../../assets/images/fridge.png'

//redux
import { connect } from 'react-redux'

const GlobalWrapper = styled.div`
    text-lign: center;
`

const ArticleWrapper = styled.div`
    padding-top: 30px;
    padding-left: 10vw;
    margin-right: 10vw;
    height: 57.5vh;
    overflow: auto;
`

const GlobalMetaWrapper = styled.div`
    text-align: center;
`

const EmptyFridgeWrapper = styled.img(props => ({
    src: props.src,
    borderRadius: '50px'
  }));

class Inventory extends Component {
    constructor(props) {
        super(props);
    }

    buildInventory() {
        console.log(this.props.inventory)
        let res = []
        for (const item in this.props.inventory) {
            console.log(item)
            res.push(
                <>
                <Article 
                    name={this.props.inventory[item].name} 
                    quantity={this.props.inventory[item].quantity} 
                    quantityUnit={this.props.inventory[item].quantityUnit} 
                    peremptionDateFormatted={this.props.inventory[item].expiringDate}
                />
                <br></br>
                </>
            )
        }
        return res
    }

    render() {
        let title;
        let content;

        if (!this.props.inventory || this.props.inventory.length == 0) {
            title = <Typography variant="h5">  Remplis ton frigo avec le scanner ! </Typography>
            content = <EmptyFridgeWrapper src={fridgeImage}></EmptyFridgeWrapper>
        } else {
            title = <Typography variant="h5">  Vous avez {Object.keys(this.props.inventory).length} articles dans votre frigo</Typography>
            content = this.buildInventory()
        }

        return (
            <GlobalWrapper>
                <GlobalMetaWrapper>
                {title}
                </GlobalMetaWrapper>
                <ArticleWrapper>
                    {content}
                </ArticleWrapper>
            </GlobalWrapper>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inventory: state.inventory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);