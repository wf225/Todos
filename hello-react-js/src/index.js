import React from 'react';
import ReactDOM from 'react-dom';

import { Hello } from "./components/Hello";
import { World } from "./components/World";

ReactDOM.render(
    <Hello />,
    document.getElementById('hello')
);

ReactDOM.render(
    <World />,
    document.getElementById('world')
);