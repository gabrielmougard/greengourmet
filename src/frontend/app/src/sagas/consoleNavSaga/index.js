
import { call, put, takeLatest } from 'redux-saga/effects'

//actions
import { fetchTabPositionEnded } from '../../actions';


function* fetchTabPosition(action) {
    const { position } = action.payload;
    yield put(fetchTabPositionEnded(position));
}

export default function* consoleNavSaga() {
    yield takeLatest('TAB_POSITION', fetchTabPosition);
}