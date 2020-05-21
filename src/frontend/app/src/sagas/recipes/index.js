import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
//actions
import { getRecipesEnded } from '../../actions';
import { RECIPES_API_BASE_URL } from '../../CONSTANTS';

function* fetchRecipes(action) {
    const inventory = action.payload;
    let ingredientsList = []

    for (const idx in inventory) {
        if (inventory[idx].ingredients) {
            ingredientsList.push(inventory[idx].ingredients)
        }
    }

    const data = {
        ingredients: ingredientsList
    }

    try {
        const response = yield call([axios, axios.post], RECIPES_API_BASE_URL+'/recipes/getListRecipes', data)   
        
        if (response.data) {
            yield put(getRecipesEnded(true, response.data)); 
        } else {
            yield put(getRecipesEnded(false)); 
        }
    } catch(e) {
        yield put(getRecipesEnded(false))
    }
}

export default function* recipesSaga() {
    yield takeLatest('GET_RECIPES', fetchRecipes)
}