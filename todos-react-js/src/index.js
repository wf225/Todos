import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from "./components/Header";
import TodoList from './components/TodoList';
// import { style } from '../css/base.css';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

ReactDOM.render(
    <Header />,
    document.getElementById('header')
);

const store = createStore(reducer)
ReactDOM.render(
    <Provider store={store}>
        <TodoList />
    </Provider>,
    document.getElementById('container')
);
