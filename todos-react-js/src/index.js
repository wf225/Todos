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

// output the state log.
applyMiddlewareByMonkeypatching(store, [ logger, crashReporter ]);

//
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);


//
function logger(store) {
    let next = store.dispatch
    return function dispatchAndLog(action) {
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
    }
}

function crashReporter(store) {
    let next = store.dispatch
    return function dispatchAndReportErrors(action) {
        try {
            return next(action)
        } catch (err) {
            console.error('ERROR:', err)
            console.log({
                action,
                state: store.getState()
            });

            throw err
        }
    }
}

function applyMiddlewareByMonkeypatching(store, middlewares) {
    middlewares = middlewares.slice()
    middlewares.reverse()

    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)
    )
}
