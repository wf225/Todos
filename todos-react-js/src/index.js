import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga'

import { Utils } from './components/Utils';
import rootReducer from './reducers'
import { SHOW_ALL } from "./constants/TodoFilters";
import { logger, crashReporter } from "./middlewares/logger"

// import { style } from '../css/base.css';

import App from './containers/App'
import { rootSaga } from './middlewares/sagas'

//
let preloadedState = {
    todos: Utils.store('react-todos'),
    showFilter: SHOW_ALL
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
    rootReducer,
    preloadedState,
    // applyMiddleware(logger, crashReporter, sagaMiddleware)
    applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(rootSaga)

//
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
