//React/Redux/Saga
import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

//Custom reducers/sagas
import reducer from './reducers';
import rootSaga from './sagas';
import App from './App';
import * as serviceWorker from './serviceWorker';

//BaseUI/Styletron providers
import {BaseProvider, LightTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

//I18next for translation
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

//Typo
import Typography from "typography"
import { theme } from './assets/js/global'

const engine = new Styletron();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
});

//typography
const typography = new Typography({
    googleFonts: [
      {
        name: 'Montserrat',
        styles: ['800', '700', '500', '400']
      },
      {
        name: 'Lato',
        styles: ['200', '400', '500', '700']
      }
    ],
    baseFontSize: "18px",
    baseLineHeight: 1.6,
    scaleRatio: 2,
    headerFontFamily: ['Montserrat', 'BlinkMacSystemFont', '-apple-system', 'Roboto', 'Lucida Sans'],
    bodyFontFamily: ['Lato', 'BlinkMacSystemFont', '-apple-system', 'Roboto', 'Lucida Sans'],
    headerColor: theme.blue,
    bodyColor: theme.lightFont,
    bodyWeight: '400'
  })
  typography.injectStyles()

ReactDOM.render(
    <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <App />
                </I18nextProvider>
            </Provider>
        </BaseProvider>
    </StyletronProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
