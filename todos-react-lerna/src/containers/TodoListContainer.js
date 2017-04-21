import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TodoList } from '../components/TodoList';
import * as TodoActions from '../actions'
import * as filters from "../constants/TodoFilters";
import { getVisibleTodos } from '../selectors'


const mapStateToProps = (state) => ({
    todos: getVisibleTodos(state)
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)
