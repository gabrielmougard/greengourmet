//here we define our saga(s)
import { spawn } from 'redux-saga/effects';
import consoleNavSaga from './consoleNavSaga'

export default function* rootSaga() {
    yield spawn(consoleNavSaga) //saga for handling component update during the navigation in the console
}