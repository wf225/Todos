import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TodoList } from '../components/TodoList';
import * as TodoActions from '../actions'
import * as filters from "../constants/TodoFilters";


const getVisibleTodos = (todos, filter) => {
    return todos.filter(function (todo) {
        switch (filter) {
            case filters.TODOS_ACTIVE:
                return !todo.isCompleted;
            case filters.TODOS_COMPLETED:
                return todo.isCompleted;
            default:
                return true;
        }
    }, this);
}

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.showFilter)
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)
