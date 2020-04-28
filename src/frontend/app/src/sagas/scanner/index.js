import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

//actions
import { sendBarcodeContentEndedSuccess, sendBarcodeContentEndedFailure, validateCartEnded } from '../../actions';
import { SCANNER_API_BASE_URL } from '../../CONSTANTS';

function* fetchBarcodeContent(action) {
    
    const { userId, barcode } = action.payload;
    console.log("userId : "+userId+" barcode : "+barcode)
    const data = {
        userId: userId,
        barcode: barcode,
    }

    try {
        var response = yield call([axios, axios.post], SCANNER_API_BASE_URL+'/scanner/barcode', data)
        console.log(response)
        if (response.data.status == 200) {
            yield put(sendBarcodeContentEndedSuccess(response.data));
        } else {
            yield put(sendBarcodeContentEndedFailure(barcode));
        }
    } catch(e) {
        console.log(e);
        yield put(sendBarcodeContentEndedFailure(barcode));
    }
}

function* validateCart(action) {
    //const { userId, barcodeContent, quantity, expirationDate } = action.payload;
    /*
    const data = {
        userId: userId,
        content: barcodeContent,
        quantity: quantity,
        expirationDate: expirationDate,
    }

    try {
        var response = yield call([axios, axios.post], SCANNER_API_BASE_URL+'/add', data)
        if (response.status == 200) {
            yield put(addBarcodeContentEnded(true));
        } else {
            yield put(addBarcodeContentEnded(false));
        }
    } catch(e) {
        console.log(e);
        yield put(addBarcodeContentEnded(false));
    }
    */
}

export default function* scannerSaga() {
    yield takeLatest('SEND_BARCODE', fetchBarcodeContent);
    yield takeLatest('VALIDATE_CART', validateCart);
}