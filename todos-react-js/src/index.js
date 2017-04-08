import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from "./components/Header";
import { TodoList } from './components/TodoList';
import { TodoModel } from './components/TodoModel';
// import { style } from '../css/base.css';


ReactDOM.render(
    <Header />,
    document.getElementById('header')
);

let model = new TodoModel('react-todos');
ReactDOM.render(
    <TodoList model={model} />,
    document.getElementById('container')
);
