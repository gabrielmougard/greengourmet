import React, { useEffect } from "react";
import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { green, red } from '@material-ui/core/colors';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

//actions
import { sendArticleToCart, cancelArticleToCart } from '../../../actions/index'

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

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

function ScannerDrawer({barcodeResult, unknownBarcode, sendArticleToCart, cancelArticleToCart}) {
    const classes = useStyles();
    const [drawerState, setDrawerState] = React.useState(false)
    const [contentItem, setContentItem] = React.useState({})
    const [dateArticle, setDateArticle] = React.useState(Date.now())
    // edit the data in the drawer after the scan
    const handleContentItemChange = (event) => {
        let newContent = Object.assign({}, contentItem);
        newContent.name = event.target.value
        setContentItem(newContent)
    }
    const handleQuantityItemChange = (event) => {
        let newContent = Object.assign({}, contentItem);
        newContent.quantity[0] = event.target.value
        setContentItem(newContent)
    }
    const handleQuantityUnitItemChange = (event) => {
        console.log(event.target.value)
        let newContent = Object.assign({}, contentItem);
        newContent.quantity[1] = event.target.value
        setContentItem(newContent)
    }
    const handleDateItemChance = (event) => {
        let newContent = Object.assign({}, contentItem);
        newContent.peremptionDate = event
        setContentItem(newContent)
        setDateArticle(event)
    }
    /////


    const handleValidateDrawer = () => {
        //reload scanner component to reload ZXing and send action to the cart
        sendArticleToCart(contentItem)
        setDrawerState(false)
        
    }

    const handleCancelDrawer = () => {
        //reload scanner component to reload ZXing and send action to the cart
        cancelArticleToCart({})
        setDrawerState(false)
    }

    useEffect(() => {
        if (barcodeResult || unknownBarcode) {
            setDrawerState(true)
            if (unknownBarcode) {
                setContentItem({barcode: unknownBarcode, name: "", quantity: ["",""], alert: "Le code barre n'a pas été trouvé"})
            } else {
                setContentItem(barcodeResult)
            }
        }
    }, [barcodeResult, unknownBarcode])

    if (drawerState && unknownBarcode) {
        barcodeResult = {barcode: unknownBarcode, name: "", quantity: ["",""], alert: "Le code barre n'a pas été trouvé"}
    }

    return (
        <Drawer anchor={"bottom"} open={drawerState}>
            {(drawerState) ? (
                <DrawerWrapper>
                    <ScannerUserInputWrapper>
                    <div>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="outlined-helperText"
                            label="Contenu"
                            onChange={e => handleContentItemChange(e)}
                            defaultValue={barcodeResult.name}
                            helperText={"code : "+barcodeResult.barcode}
                            variant="outlined"
                        />
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                        id="outlined-helperText"
                        onChange={e => handleQuantityItemChange(e)}
                        label="Quantité"
                        variant="outlined"
                        defaultValue={barcodeResult.quantity[0]}
                        />
                    </div>
                    <div>
                        
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="grouped-select">Unité</InputLabel>
                            <Select defaultValue="" id="grouped-select" onChange={e => handleQuantityUnitItemChange(e)}>
                                <ListSubheader>Masse</ListSubheader>
                                <MenuItem value={"g"}>gramme(s)</MenuItem>
                                <MenuItem value={"kg"}>kilogramme(s)</MenuItem>
                                <ListSubheader>Volume</ListSubheader>
                                <MenuItem value={"ml"}>millilitre(s)</MenuItem>
                                <MenuItem value={"cl"}>centilitre(s)</MenuItem>
                                <MenuItem value={"dl"}>decilitre(s)</MenuItem>
                                <MenuItem value={"l"}>litre(s)</MenuItem>
                                <MenuItem value={"tasse"}>tasse(s)</MenuItem>
                                <MenuItem value={"csoupe"}>cuillère(s) à soupe</MenuItem>
                                <MenuItem value={"ccafe"}>cuillère(s) à café</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            format="MM/dd/yyyy"
                            onChange={e => handleDateItemChance(e)}
                            margin="normal"
                            value={dateArticle}
                            id="date-picker-inline"
                            label="Date de préremption"
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider>
                    </div>
                    </ScannerUserInputWrapper>
                    <ScannerValidationWrapper>
                        <ScannerValidateButtonWrapper>
                            <ValidateButton onClick={handleValidateDrawer}>Valider</ValidateButton>
                        </ScannerValidateButtonWrapper>
                        <ScannerCancelButtonWrapper>
                            <CancelButton onClick={handleCancelDrawer}>Annuler</CancelButton>
                        </ScannerCancelButtonWrapper>
                    </ScannerValidationWrapper>
                </DrawerWrapper>
            ) :(
                <></>
            )}
      </Drawer>
    )
}

const mapStateToProps = (state) => {
    return {
        barcodeResult: state.barcodeResult,
        unknownBarcode: state.unknownBarcode,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendArticleToCart: (article) => {dispatch(sendArticleToCart(article))},
        cancelArticleToCart: (article) => {dispatch(cancelArticleToCart(article))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScannerDrawer);