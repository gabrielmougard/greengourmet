//here we define our saga(s)
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRap(action) {

}

function* fetchOutput(action) {
    
}

function* actionWatcher() {
    yield takeLatest('GET_RAP', fetchRap);
    yield takeLatest('DOWNLOAD_OUTPUT', fetchOutput);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}