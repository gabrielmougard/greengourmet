import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { getInventoryEnded, updateInventorySuccess, updateInventoryFailure } from '../../actions'
import { INVENTORY_CRUD_API_BASE_URL } from '../../CONSTANTS';

//lib
import { updateLocalInventory } from '../../libs/inventory-matcher'

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

function* updateInventory(action) {
    const data = action.payload
    const inventoryUpdated = updateLocalInventory(data.inventory, data.recipeIngredients) //update locally
    console.log("UPDATE INVENTORY")
    console.log(inventoryUpdated)
    
    try {
        let successfulAPIhit = 0

        for (const idx in inventoryUpdated.toUpdate) {
            //TODO for later : replace this ugly for loop with a single API endpoint which take a list of article in parameter instead of just one...
            const articleId = inventoryUpdated.toUpdate[idx].articleId
            const updatedArticle = inventoryUpdated.toUpdate[idx]

            var response = yield call([axios, axios.put], INVENTORY_CRUD_API_BASE_URL+'/article/update/'+articleId, updatedArticle)
            
            if (response.data) {
                console.log("toUpdate response")
                console.log(response.data)
                successfulAPIhit += 1
            }
        }

        for (const idx in inventoryUpdated.toDelete) {
            const articleId = inventoryUpdated.toDelete[idx].articleId

            var response = yield call([axios, axios.delete], INVENTORY_CRUD_API_BASE_URL+'/article/delete/'+articleId)
            if (response.data) {
                console.log("toDelete response")
                console.log(response.data)
                successfulAPIhit += 1
            }
        }

        if (successfulAPIhit == (inventoryUpdated.toDelete.length + inventoryUpdated.toUpdate.length)) {
            //the API calls have all been successful
            yield put(updateInventorySuccess(inventoryUpdated))
        } else {
            console.log("Error : wrong number of successful API response.")
            yield put(updateInventoryFailure())
        }
    } catch (e) {
        console.log(e)
        yield put(updateInventoryFailure())
    }
    
}

export default function* inventorySaga() {
    yield takeLatest('GET_INVENTORY', fetchInventory);
    yield takeLatest('UPDATE_INVENTORY', updateInventory);
}