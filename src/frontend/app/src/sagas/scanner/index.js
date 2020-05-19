import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

//actions
import { sendBarcodeContentEndedSuccess, sendBarcodeContentEndedFailure, validateCartEnded } from '../../actions';
import { SCANNER_API_BASE_URL, INVENTORY_CRUD_API_BASE_URL } from '../../CONSTANTS';

function* fetchBarcodeContent(action) {
    
    const { userId, barcode } = action.payload;
    console.log("userId : "+userId+" barcode : "+barcode)
    const data = {
        userId: userId,
        barcode: barcode,
    }

    try {
        var response = yield call([axios, axios.post], SCANNER_API_BASE_URL+'/scanner', data)
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
    
    console.log("les articles : ")
    
    const data = {articles: action.payload.cartContentData}
    console.log(data)
    try {
        var response = yield call([axios, axios.post], INVENTORY_CRUD_API_BASE_URL+'/article', data)
        console.log("response")
        console.log(response)
        if (response.data.success) {
            yield put(validateCartEnded(true));
        } else {
            yield put(validateCartEnded(false));
        }
    } catch(e) {
        console.log(e);
        yield put(validateCartEnded(false));
    }
}

export default function* scannerSaga() {
    yield takeLatest('SEND_BARCODE', fetchBarcodeContent);
    yield takeLatest('VALIDATE_CART', validateCart);
}