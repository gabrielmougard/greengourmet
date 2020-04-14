import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

//actions
import { fetchPincodeEnded, regeneratePincodeEnded } from '../../actions';
import { AUTH_API_BASE_URL } from '../../CONSTANTS';

function* fetchPincode(action) {
    const { pincodeValue, userEmail } = action.payload;
    const data = {
        pincode: pincodeValue.join(''),
        email: userEmail,
    }
    try {
        var response = yield call([axios, axios.post], AUTH_API_BASE_URL+'/auth/checkpincode', data)
        if (response.data.success) {
            yield put(fetchPincodeEnded(true));
        } else {
            yield put(fetchPincodeEnded(false));
        }
    } catch(e) {
        console.log(e);
        yield put(fetchPincodeEnded(false));
    }
}

function* fetchRegeneratePincode(action) {
    const { userEmail } = action.payload;
    const data = {
        email: userEmail,
    }
    try {
        var response = yield call([axios, axios.post], AUTH_API_BASE_URL+'/auth/newpincode', data)
        if (response.data.success) {
            yield put(regeneratePincodeEnded(true));
        } else {
            yield put(regeneratePincodeEnded(false));
        }
    } catch(e) {
        console.log(e);
        yield put(regeneratePincodeEnded(false));
    }
}

export default function* pincodeSaga() {
    yield takeLatest('SEND_PINCODE', fetchPincode);
    yield takeLatest('REGENERATE_PINCODE', fetchRegeneratePincode);
}