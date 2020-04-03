import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

//actions
import { fetchBarcodeContentEnded, addBarcodeContentEnded } from '../../actions';
import { SCANNER_API_BASE_URL } from '../../CONSTANTS';

function* fetchBarcodeContent(action) {
    const { userId, barcode } = action.payload;
    const data = {
        userId: userId,
        barcode: barcode,
    }

    try {
        var response = yield call([axios, axios.post], SCANNER_API_BASE_URL+'/search', data)
        if (response.status == 200 && response.barcodeContent) {
            yield put(fetchBarcodeContentEnded(true, response.barcodeContent));
        } else {
            yield put(fetchBarcodeContentEnded(false));
        }
    } catch(e) {
        console.log(e);
        yield put(fetchBarcodeContentEnded(false));
    }
}

function* addBarcodeContent(action) {
    const { userId, barcodeContent, quantity, expirationDate } = action.payload;
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
}

export default function* scannerSaga() {
    yield takeLatest('SEND_BARCODE', fetchBarcodeContent);
    yield takeLatest('ADD_BARCODE', addBarcodeContent);
}