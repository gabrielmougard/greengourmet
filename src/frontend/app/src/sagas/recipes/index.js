import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
//actions
import { sendRecipesContentSucces } from '../../actions';

function* fetchRecipesContent(action) {
    const name = action.payload;
    const data = {
        name: name,
    }

    try {
        console.log('data:',data,'name:',name)
        const response = yield call([axios, axios.post], +'/api'    )   
        console.log('resultat:',response)
            yield put(sendRecipesContentSucces(response));

 	
     
    } catch(e) {
        console.log(e);
    }
}

export default function* recipesSaga() {
    yield takeLatest('FIND_RECIPES_CONTENT', fetchRecipesContent)
}