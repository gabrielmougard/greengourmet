import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
//actions
import { getRecipesEnded, getRecipeDetailsEndedFailure, getRecipeDetailsEndedSuccess } from '../../actions';
import { RECIPES_API_BASE_URL } from '../../CONSTANTS';

function* fetchRecipes(action) {
    const startIdx = action.payload.startIdx;
    const inventory = action.payload.inventory;
    let ingredientsList = []

    for (const idx in inventory) {
        if (inventory[idx].ingredients) {
            ingredientsList.push(inventory[idx].ingredients)
        }
    }

    const data = {
        startIdx: startIdx,
        ingredients: ingredientsList
    }

    try {
        const response = yield call([axios, axios.post], RECIPES_API_BASE_URL+'/recipes/getListRecipes', data)   
        console.log(response.data)
        if (response.data) {
            
            yield put(getRecipesEnded(true, response.data)); 
        } else {
            yield put(getRecipesEnded(false)); 
        }
    } catch(e) {
        yield put(getRecipesEnded(false))
    }
}

function* fetchRecipeDetails(action) {
    const link = action.payload
    const data = {
        link: link
    }
    try {
        const response = yield call([axios, axios.post], RECIPES_API_BASE_URL+'/recipes/getRecipeDetails', data)   
        
        if (response.data) {
            console.log(response.data)
            const payload = {
                link: link,
                response: response.data
            }
            yield put(getRecipeDetailsEndedSuccess(payload)); 
        } else {
            yield put(getRecipeDetailsEndedFailure()); 
        }
    } catch(e) {
        yield put(getRecipeDetailsEndedFailure())
    }
}

export default function* recipesSaga() {
    yield takeLatest('GET_RECIPES', fetchRecipes)
    yield takeLatest('GET_RECIPE_DETAILS', fetchRecipeDetails)
}