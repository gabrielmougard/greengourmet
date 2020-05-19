import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { getInventoryEnded } from '../../actions'
import { INVENTORY_CRUD_API_BASE_URL } from '../../CONSTANTS';

function* fetchInventory(action) {
    const userId = action.payload

    try {
        var response = yield call([axios, axios.get], INVENTORY_CRUD_API_BASE_URL+'/article/user/'+userId)
        console.log("GET INVENTORY")
        console.log(response.data)
        if (response.data) {
            //localStorage.setItem("inventory", response.data) //save it into local browser storage
            yield put(getInventoryEnded(true, response.data));
        } else {
            yield put(getInventoryEnded(false));
        }
    } catch (e) {
        console.log(e);
        yield put(getInventoryEnded(false));
    }
}

export default function* inventorySaga() {
    yield takeLatest('GET_INVENTORY', fetchInventory);
}