import React, { Component, PropTypes } from 'react'
import TodoList from './TodoListContainer'
import TodoFooter from './FooterContainer'
import TodoHeader from './HeaderContainer'

/*
TodoHeader: add todo item
TodoList: show and edit todo items
TodoFooter: filter items, and clearCompleted. 
*/

const App = () => (
    <div>
        <TodoHeader />
        <TodoList />
        <TodoFooter />
    </div>
)

export default App