import React, {Component} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import {PinCode} from 'baseui/pin-code';
import {SIZE} from 'baseui/input';
import {Display3} from 'baseui/typography';
import {Button} from 'baseui/button';

//css
import './pincode.css'
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      opacity: 10.0,
    },
}));

function handleRegenerate() {
    console.log("regenerating pin code")
}

function PinCodeEmail() {
    const classes = useStyles();
    const [valuesPinCode, setValuesPinCode] = React.useState(['', '', '', '', '', '']);

    return (
        <Backdrop className={classes.backdrop} open={true}>
            <div>
                <div>
                    <Display3 marginBottom="scale500" color="white">Veuillez rentrer le code pin que vous avez reçu par mail.</Display3>
                </div>
                <div className="pincode-wrapper">
                    <div className="pincode-container">
                        <PinCode
                            size={SIZE.large}
                            values={valuesPinCode}
                            onChange={({values}) => {
                                setValuesPinCode(values);
                            }}
                        />
                    </div>
                </div>
                <div className="pincode-regenerate">
                    <Button onClick={handleRegenerate}>
                        Générer un autre code
                    </Button>
                </div>
            </div> 
        </Backdrop>
    )
}

export default PinCodeEmail