import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TodoFooter } from '../components/TodoFooter';
import * as TodoActions from '../actions'


const getActiveCount = (todos) => {
    let activeTodoCount = todos.reduce(function (accumulator, currentTodo) {
        return currentTodo.isCompleted ? accumulator : accumulator + 1;
    }, 0);
    return activeTodoCount
}

const mapStateToProps = (state) => {
    let activeCount = getActiveCount(state.todos);
    return ({
        filter: state.showFilter,
        activeCount: activeCount,
        completedCount: state.todos.length - activeCount
    });
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoFooter)
