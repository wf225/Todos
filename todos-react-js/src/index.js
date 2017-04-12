import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { Utils } from './components/Utils';
import rootReducer from './reducers'
import { SHOW_ALL } from "./constants/TodoFilters";

import App from './containers/App'
// import { style } from '../css/base.css';

//
let preloadedState = {
    todos: Utils.store('react-todos'),
    showFilter: SHOW_ALL
};
const store = createStore(rootReducer, preloadedState)

//
let next = store.dispatch
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

//
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
