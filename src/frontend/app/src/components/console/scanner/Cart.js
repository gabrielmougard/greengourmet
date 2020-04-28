import React, { useEffect, useLayoutEffect } from "react";
import styled from 'styled-components'
import {Display4} from 'baseui/typography';
import { green, red } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

//assets
import barcodeAnimation from '../../../assets/images/barcodeAnimation.gif'

//components
import Article from '../inventory/articleCard'

const CartPreviewWrapper = styled.div`
  position: absolute;
  text-align: center;
  z-index: 3;
  float: right;
  margin-left: 70vw;
  padding: 20px 20px 20px 20px;
  width: 500px;
  height: 600px;
  overflow: auto;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 6px 10px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 6px 10px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 6px 10px 1px rgba(0,0,0,0.75);
  -o-box-shadow: 10px 10px  5px rgba(0,0,0,0.6);
  border-radius:15px;
`

const CartPreviewArticleListWrapper = styled.div`
  width: 100%;  
  height: 80%;
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(1, 1fr);
  overflow: auto;
  grid-gap: 10px;
  text-align: center;
`

const CartButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`

const ValidateButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[800]),
      backgroundColor: green[800],
      '&:hover': {
        backgroundColor: green[900],
      },
    },
  }))(Button);
  
const ResetButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
}))(Button);

function Cart({articleToCart}) {

    const initialCartContent = 
        <div>
            vous n'avez pas d'articles.<br></br> Faites chauffer le scanner !
            <img src={barcodeAnimation} />
        </div>
    const [initialCartState, setInitialCartState] = React.useState(true)
    const [cartContent, setCartContent] = React.useState(initialCartContent)

    useEffect(() => {

        if (articleToCart) {
            console.log("CHANGE CART !!")
            if (initialCartState) {
                setCartContent([
                    <Article name={articleToCart.name} quantity={articleToCart.quantity[0]} quantityUnit={articleToCart.quantity[1]} peremptionDate={articleToCart.peremptionDate}/>      
                ]);
                setInitialCartState(false)
            } else {
                setCartContent([ ...cartContent,
                    <Article name={articleToCart.name} quantity={articleToCart.quantity[0]} quantityUnit={articleToCart.quantity[1]} peremptionDate={articleToCart.peremptionDate}/>
                ]);
            }
        }
    }, [articleToCart])

    let cartFinalActions
    if (cartContent != initialCartContent) {
        cartFinalActions =
            <CartButtonWrapper>
                <div>
                    <ValidateButton>Valider</ValidateButton>
                </div>
                <div>
                    <ResetButton>Réinitialiser</ResetButton>
                </div>
            </CartButtonWrapper>
    }
    return (
        <CartPreviewWrapper>
            <Display4>Votre panier</Display4>
            <CartPreviewArticleListWrapper>
                {cartContent}
            </CartPreviewArticleListWrapper>
            {cartFinalActions}
        </CartPreviewWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        articleToCart: state.articleToCart,
    }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);