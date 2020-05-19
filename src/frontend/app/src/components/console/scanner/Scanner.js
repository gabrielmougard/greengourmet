import React, { useEffect } from "react";
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { BrowserBarcodeReader } from '@zxing/library'

//redux
import { connect } from 'react-redux'

//CSS
import './Scanner.css'

//assets
import barcodeAnimation from '../../../assets/images/barcodeAnimation.gif'

//actions
import { sendBarcodeContent, validateCart } from '../../../actions'

//components
import Cart from './Cart'
import ScannerDrawer from './ScannerDrawer'

const backdropStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const DrawerWrapper = styled.div`
  width: 100%;
  padding: 20px 20px 20px 20px;
`

const ScannerUserInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 600px 200px 200px auto;
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

function Scanner({userId, sendBarcodeContent, barcodeResult, articleToCart, cancelArticleToCart, unknownBarcode, validateCart, cartValidated}) {
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

  useEffect(() => {
    let selectedDeviceId;
    const codeReader = new BrowserBarcodeReader();
    console.log('ZXing code reader initialized')
    codeReader.getVideoInputDevices().then((videoInputDevices) => {
        
      selectedDeviceId = videoInputDevices[0].deviceId
          
      codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'interactive-scanner')
        .then(result => detected(result.text))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }, [articleToCart, cancelArticleToCart])

  
  
  
  let backdrop
  if (backDropState) {
    backdrop = 
    <Backdrop className={classBackdrop.backdrop} open={backDropState}>
      <CircularProgress color="inherit" />
    </Backdrop>
  }

  useEffect(() => {
    setBackDropState(false)
  }, [barcodeResult, unknownBarcode])


  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <>
    <Cart userId={userId}/>
    <video id="interactive-scanner"></video>
    <ScannerDrawer />
    {backdrop}
    </>
    
  );
};

const mapStateToProps = (state) => {
    return {
        barcodeResult: state.barcodeResult,
        unknownBarcode: state.unknownBarcode,
        articleToCart: state.articleToCart,
        cancelArticleToCart: state.cancelArticleToCart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendBarcodeContent: (userId, barcode) => {dispatch(sendBarcodeContent(userId, barcode))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
