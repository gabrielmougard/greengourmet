import React, { useEffect, useLayoutEffect } from "react";
import config from "../../../libs/scanner/configHome.json";
import { detectionThreshold } from "../../../libs/scanner/threshold";
import Quagga from "quagga";

import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Drawer from '@material-ui/core/Drawer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import {Display4} from 'baseui/typography';
import { BrowserBarcodeReader } from '@zxing/library'
import Article from '../inventory/articleCard'
//redux
import { connect } from 'react-redux'

//CSS
import './Scanner.css'

//assets
import barcodeAnimation from '../../../assets/images/barcodeAnimation.gif'

//actions
import { sendBarcodeContent, validateCart } from '../../../actions'

const backdropStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

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
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  overflow: auto;
  text-align: center;
`

const CartButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`

const DrawerWrapper = styled.div`
  width: 100%;
  padding: 20px 20px 20px 20px;
`

const ScannerUserInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 600px 200px auto;
  grid-gap: 20px;
`

const ScannerValidationWrapper = styled.div`
  padding-top: 50px;
  display: block;
  width: 100%;
`

const ScannerCancelButtonWrapper = styled.div`
  padding-right: 80px;
  float: right;
`

const ScannerValidateButtonWrapper = styled.div`
  padding-right: 60px;
  float: right;
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

const CancelButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

function Scanner({userId, sendBarcodeContent, barcodeResult, validateCart, cartValidated}) {
    const [toggleZXing, setToggleZXing] = React.useState(true)
    const [barcode, setBarcode] = React.useState("")
    const [drawerState, setDrawerState] = React.useState(false);
    const [backDropState, setBackDropState] = React.useState(false)
    const [cartContent, setCartContent] = React.useState([])

  const detected = result => {
    setToggleZXing(false)
    setBarcode(result)
    setBackDropState(true);
    setDrawerState(true)
    console.log("A reliable decoded value is : "+result);
            
    //call the saga here for getting the content of the decoded barcode
    sendBarcodeContent(userId, result);
    //
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    setDrawerState(open);
  }

  const classBackdrop = backdropStyles();

 
  let selectedDeviceId;
  const codeReader = new BrowserBarcodeReader();
  console.log('ZXing code reader initialized')
  if (toggleZXing) {
    codeReader.getVideoInputDevices().then((videoInputDevices) => {
      
      selectedDeviceId = videoInputDevices[0].deviceId
      console.log(selectedDeviceId)
        
      codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'interactive-scanner')
        .then(result => detected(result.text))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }
  
  let backdrop
  if (backDropState) {
    backdrop = 
    <Backdrop className={classBackdrop.backdrop} open={backDropState}>
      <CircularProgress color="inherit" />
    </Backdrop>
  }

  let drawerContent
  useLayoutEffect(() => {
    
    if (barcodeResult) {
      setBackDropState(false);
      setDrawerState(true)
      //setup the drawerContent here
      drawerContent = 
        <DrawerWrapper>
          <ScannerUserInputWrapper>
            <div>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="outlined-helperText"
                  label="Contenu"
                  defaultValue="barcode content"
                  helperText="code : 647586858585"
                  variant="outlined"
                />
              </FormControl>
            </div>
            <div>
              <TextField
                id="outlined-helperText"
                label="Quantité"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="outlined-helperText"
                label="Unité"
                variant="outlined"
              />
            </div>
          </ScannerUserInputWrapper>
          <ScannerValidationWrapper>
            <ScannerValidateButtonWrapper>
              <ValidateButton>Valider</ValidateButton>
            </ScannerValidateButtonWrapper>
            <ScannerCancelButtonWrapper>
              <CancelButton>Annuler</CancelButton>
            </ScannerCancelButtonWrapper>
          </ScannerValidationWrapper>
        </DrawerWrapper>
    }
  })

  if (cartContent.length == 0) {
    cartContent.push( 
      <div>
        vous n'avez pas d'articles.<br></br> Faites chauffer le scanner !
        <img src={barcodeAnimation} />
      </div>
    )
  } else {
      cartContent.push(
        <div>
          <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/21"}/>
        </div>
      )
  }

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <>
    <CartPreviewWrapper>
      <Display4>Votre panier</Display4>
      <CartPreviewArticleListWrapper>
        {cartContent}
      </CartPreviewArticleListWrapper>
      <CartButtonWrapper>
        <div>
          <Button variant="outlined" color="primary" disabled>Valider</Button>
        </div>
        <div>
          <Button variant="outlined" color="primary" disabled>Réinitialiser</Button>
        </div>
      </CartButtonWrapper>
    </CartPreviewWrapper>
    <video id="interactive-scanner"></video>
    <Drawer anchor={"bottom"} open={drawerState} onClose={toggleDrawer(false)}>
      {drawerContent}
    </Drawer>
    {backdrop}
    </>
    
  );
};

const mapStateToProps = (state) => {
    return {
        barcodeResult: state.barcodeResult,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendBarcodeContent: (userId, barcode) => {dispatch(sendBarcodeContent(userId, barcode))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
