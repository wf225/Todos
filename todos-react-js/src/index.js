import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { Utils } from './components/Utils';
import rootReducer from './reducers'
import { SHOW_ALL } from "./constants/TodoFilters";
import { logger, crashReporter } from "./middlewares/logger"

import App from './containers/App'
// import { style } from '../css/base.css';

//
let preloadedState = {
    todos: Utils.store('react-todos'),
    showFilter: SHOW_ALL
};
const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(logger, crashReporter)
)

//
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
