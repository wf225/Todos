import React from 'react';
import ReactDOM from 'react-dom';

import { Hello } from "./components/Hello";
import { World } from "./components/World";

import style from '../css/base.css';

ReactDOM.render(
    <Hello />,
    document.getElementById('hello')
);

ReactDOM.render(
    <World />,
    document.getElementById('world')
);