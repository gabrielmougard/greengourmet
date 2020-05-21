//here we define our saga(s)
import { spawn } from 'redux-saga/effects';
import consoleNavSaga from './consoleNavSaga'
import scannerSaga from './scanner'
import pincodeSaga from './pincode'
import inventorySaga from './inventory'
import recipesSaga from './recipes'

export default function* rootSaga() {
    yield spawn(consoleNavSaga) //saga for handling component update during the navigation in the console
    yield spawn(scannerSaga) //saga for handling component update during the scanner processing
    yield spawn(pincodeSaga) //saga for handling component update during the pincode processing (when it is the first connexion)
    yield spawn(inventorySaga) //saga for handling component update whenever the inventory of a user is changed
    yield spawn(recipesSaga) //saga for handling component update whenever we want to retrieves recipes
}