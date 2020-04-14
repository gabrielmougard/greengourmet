import React, {Component, useEffect} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import {PinCode} from 'baseui/pin-code';
import {SIZE} from 'baseui/input';
import {Display3} from 'baseui/typography';
import {Button} from 'baseui/button';
import Alert from 'react-s-alert';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { connect } from 'react-redux'

//action 
import { sendPincode, regeneratePincode, unlockPincodeScreen } from '../../../actions';

//css
import './pincode.css'
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      opacity: 10.0,
    },
}));

function PinCodeEmail({userEmail, sendPincode, pincodeEnded, regeneratePincode, regeneratePincodeEnded, unlockPincodeScreen }) {
    
    const classes = useStyles();
    const [valuesPinCode, setValuesPinCode] = React.useState(['', '', '', '', '', '']);
    const [attempt, setAttempt] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    let pincodeComponent
    let regenerateButton

    const handleRegenerate = () => {
        setLoading(true);
        regeneratePincode(userEmail);
    }

    if (pincodeEnded != undefined && valuesPinCode != ['', '', '', '', '', '']) {
        if (pincodeEnded == true) {
            //the pincode is matched
            pincodeComponent = <PinCode
                positive
                size={SIZE.large}
                values={valuesPinCode}
            />
            if (loading != false) {
                setLoading(false)
            }
            //after a small delay unlock screen
            setTimeout(() => {
                unlockPincodeScreen()
            },300)


        } else {
            //the pincode does not match
        
            pincodeComponent = <PinCode
                error
                size={SIZE.large}
                values={valuesPinCode}
                onChange={({values}) => {
                    setValuesPinCode(values);
                    if (!values.includes('')) {
                        setLoading(true);
                        sendPincode(values, userEmail);
                    }
                }}
            />
            if (loading != false) {
                setLoading(false)
                setValuesPinCode(['', '', '', '', '', ''])
            }
        }
    } else {
        pincodeComponent = <PinCode
            size={SIZE.large}
            values={valuesPinCode}
            onChange={({values}) => {
                setValuesPinCode(values);
                if (!values.includes('')) {
                    //call the saga for /checkpincode
                    setLoading(true)
                    sendPincode(values, userEmail);
                }
            }}
        />
    }

    if (!loading) {
        regenerateButton = 
            <Button onClick={handleRegenerate}>
                Générer un autre code
            </Button>
    } else {
        if (regeneratePincodeEnded) {
            setLoading(false);
            regenerateButton = 
                <Button onClick={handleRegenerate}>
                    Générer un autre code
                </Button>
        } else {
            regenerateButton = 
            <Button onClick={handleRegenerate} disabled>
                Générer un autre code
            </Button>

            pincodeComponent = <PinCode
                disabled
                size={SIZE.large}
                values={valuesPinCode}
                onChange={({values}) => {
                    setValuesPinCode(values);
                    if (!values.includes('')) {
                        //call the saga for /checkpincode
                        sendPincode(values, userEmail);
                    }
                }}
            />
        }
    }


    return (
        <Backdrop className={classes.backdrop} open={true}>
            <div>
                <div>
                    <Display3 marginBottom="scale500" color="white">Veuillez rentrer le code pin que vous avez reçu par mail.</Display3>
                </div>
                <div className="pincode-wrapper">
                    <div className="pincode-container">
                        {pincodeComponent}
                    </div>
                </div>
                <div className="pincode-regenerate">
                    {regenerateButton}
                </div>
                <div className="pincode-loader">
                    {(loading) ? (<CircularProgress color="inherit" />) : (<></>)}
                </div>
            </div> 
        </Backdrop>
    )
}

const mapStateToProps = (state) => {
    return {
        pincodeEnded: state.pincodeEnded,
        regeneratePincodeEnded: state.regeneratePincodeEnded
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        sendPincode: (pincode, userEmail) => {dispatch(sendPincode(pincode, userEmail))},
        regeneratePincode: (userEmail) => {dispatch(regeneratePincode(userEmail))},
        unlockPincodeScreen: () => {dispatch(unlockPincodeScreen())},
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(PinCodeEmail)