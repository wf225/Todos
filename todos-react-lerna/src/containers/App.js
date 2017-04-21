import React, { Component, PropTypes } from 'react'
import TodoListContainer from './TodoListContainer'
import FooterContainer from './FooterContainer'
import HeaderContainer from './HeaderContainer'
import { Provider } from 'react-slot-fill'
import Workspace from '../components/Workspace';

/*
TodoHeader: add todo item
TodoList: show and edit todo items
TodoFooter: filter items, and clearCompleted. 
*/

/*const App = () => (
    <div>
        <HeaderContainer />
        <TodoListContainer />
        <FooterContainer />
    </div>
)*/

const App = () => (
    <Provider>
        <div>
            <Workspace />
            <HeaderContainer />
            <TodoListContainer />
            <FooterContainer />
        </div>
    </Provider>
)

export default App