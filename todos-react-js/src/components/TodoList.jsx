import React, { Component, PropTypes } from 'react'
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { TODOS_ALL, TODOS_ACTIVE, TODOS_COMPLETED } from "../constants/TodoFilters";
import * as key from "../constants/Key"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilter: TODOS_ALL,
      editing: null,
      newTodo: ''
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  componentWillUnmount() {
  }


  handleShow(filter) {
    this.setState({ showFilter: filter });
  }

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== key.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    let val = this.state.newTodo.trim();

    if (val) {
      this.props.actions.add(val);
      this.setState({ newTodo: '' });
    }
  }

  handleToggleAll(event) {
    let checked = event.target.checked;
    this.props.actions.toggleAll(checked);
  }

  handleToggle(todoToToggle) {
    this.props.actions.toggle(todoToToggle);
  }

  handleDestroy(todo) {
    this.props.actions.remove(todo);
  }

  handleEdit(todo) {
    this.setState({ editing: todo.id });
  }

  handleSave(todoToSave, text) {
    this.props.actions.edit(todoToSave, text);
    this.setState({ editing: null });
  }

  handleCancel() {
    this.setState({ editing: null });
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted();
  }


  renderHeader() {
    return (
      <header>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.newTodo}
          onKeyDown={this.handleNewTodoKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}
          autoFocus={true}
        />
      </header>
    );
  }

  renderFooter(filter, activeTodoCount, completedCount) {
    if (activeTodoCount || completedCount) {
      return (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          filter={filter}
          onShow={this.handleShow.bind(this)}
        />
      );
    }
  }

  getVisibleTodos(todos, filter) {
    return todos.filter(function (todo) {
      switch (filter) {
        case TODOS_ACTIVE:
          return !todo.isCompleted;
        case TODOS_COMPLETED:
          return todo.isCompleted;
        default:
          return true;
      }
    }, this);
  }

  renderTodoItems(todos, filter, activeTodoCount) {
    let shownTodos = this.getVisibleTodos(todos, filter);
    let todoItems = shownTodos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.handleToggle.bind(this, todo)}
          onDestroy={this.handleDestroy.bind(this, todo)}
          onEdit={this.handleEdit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.handleSave.bind(this, todo)}
          onCancel={this.handleCancel.bind(this)}
        />
      );
    }, this);

    if (todos.length) {
      return (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.handleToggleAll.bind(this)}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }
  }

  render() {
    let todos = this.props.todos;
    let activeTodoCount = todos.reduce(function (accumulator, currentTodo) {
      return currentTodo.isCompleted ? accumulator : accumulator + 1;
    }, 0);
    let completedCount = todos.length - activeTodoCount;

    return (
      <div>
        {this.renderHeader()}
        {this.renderTodoItems(todos, this.state.showFilter, activeTodoCount)}
        {this.renderFooter(this.state.showFilter, activeTodoCount, completedCount)}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
