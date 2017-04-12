import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { Utils } from './components/Utils';
import rootReducer from './reducers'
import { TODOS_ALL } from "./constants/TodoFilters";

import App from './containers/App'
// import { style } from '../css/base.css';

let preloadedState = {
    todos: Utils.store('react-todos'),
    showFilter: TODOS_ALL
};
const store = createStore(rootReducer, preloadedState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
