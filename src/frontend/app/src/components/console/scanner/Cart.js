import React, { useEffect, useLayoutEffect } from "react";
import styled from 'styled-components'
import {Display4} from 'baseui/typography';
import { green, red } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Alert from 'react-s-alert';

//assets
import barcodeAnimation from '../../../assets/images/barcodeAnimation.gif'

//components
import Article from '../inventory/articleCard'
import { validateCart } from "../../../actions";

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

function Cart({userId, articleToCart, validateCart, cartValidated}) {

    const initialCartContent = 
        [<div>
            vous n'avez pas d'articles.<br></br> Faites chauffer le scanner !
            <img src={barcodeAnimation} />
        </div>]
    const [initialCartState, setInitialCartState] = React.useState(true)
    const [cartContent, setCartContent] = React.useState(initialCartContent)
    const [cartContentData, setCartContentData] = React.useState([])

    useEffect(() => {

        console.log(articleToCart)
        if (articleToCart) {
            if (initialCartState) {
                setCartContent([
                    <Article name={articleToCart.name} quantity={articleToCart.quantity[0]} quantityUnit={articleToCart.quantity[1]} peremptionDate={articleToCart.peremptionDate}/>      
                ]);
                
                let ingredients
                if (!articleToCart.ingredients) {
                    ingredients = articleToCart.name
                } else {
                    ingredients = articleToCart.ingredients
                }

                setCartContentData([{
                    userId : userId,
                    name: articleToCart.name,
                    ingredients: ingredients,
                    quantity: articleToCart.quantity[0],
                    quantityUnit: articleToCart.quantity[1],
                    expiringDate: formatDate(articleToCart.peremptionDate),
                    barcode: articleToCart.barcode
                }])
                setInitialCartState(false)
            } else {
                console.log("cart content")
                console.log(cartContent)
                setCartContent([ ...cartContent,
                    <Article name={articleToCart.name} quantity={articleToCart.quantity[0]} quantityUnit={articleToCart.quantity[1]} peremptionDate={articleToCart.peremptionDate}/>
                ]);

                let ingredients
                if (!articleToCart.ingredients) {
                    ingredients = articleToCart.name
                } else {
                    ingredients = articleToCart.ingredients
                }

                setCartContentData([...cartContentData, {
                    userId : userId,
                    name: articleToCart.name,
                    ingredients: ingredients,
                    quantity: articleToCart.quantity[0],
                    quantityUnit: articleToCart.quantity[1],
                    expiringDate: formatDate(articleToCart.peremptionDate),
                    barcode: articleToCart.barcode
                }])
            }
            console.log(cartContentData)
        }

        if (cartValidated) {
            setCartContent(initialCartContent)
            //alert message
            Alert.success("Votre frigo a bien été mis à jour !");
        }
    }, [articleToCart, cartValidated])

    function cancelCart() {
        setCartContent(initialCartContent)
        setCartContentData([])
    }

    function formatDate(d) {
        var date = new Date(d),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (day.length == 1) {
            day = "0"+day
        }
        if (month.length == 1) {
            month = "0"+month
        }
        return day+"/"+month+"/"+year
    }

    let cartFinalActions
    if (cartContent != initialCartContent && cartValidated != true) {
        cartFinalActions =
            <CartButtonWrapper>
                <div>
                    <ValidateButton onClick={() => validateCart({cartContentData})}>Valider</ValidateButton>
                </div>
                <div>
                    <ResetButton onClick={() => cancelCart()}>Réinitialiser</ResetButton>
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
        cartValidated: state.cartValidated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        validateCart: (cartContent) => {dispatch(validateCart(cartContent))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);