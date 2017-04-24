import React, { Component, PropTypes } from 'react'
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "../constants/TodoFilters";
import * as key from "../constants/Key"
import Workspace from 'todos-platform';

export class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleEdit(todo) {
    this.setState({ editing: todo.id });
  }

  handleSave(todoToSave, text) {
    this.props.actions.save(todoToSave, text);
    this.setState({ editing: null });
  }

  handleCancel() {
    this.setState({ editing: null });
  }

  renderTodoItems(todos, activeTodoCount) {
    const { actions } = this.props;
    let todoItems = todos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={(e) => actions.toggle(todo)}
          onDestroy={(e) => actions.remove(todo)}
          onEdit={(e) => this.handleEdit(todo)}
          editing={this.state.editing === todo.id}
          onSave={(text) => this.handleSave(todo, text)}
          onCancel={(e) => this.handleCancel()}
        />
      );
    }, this);

    if (todos.length) {
      return (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={(e) => actions.toggleAll(e.target.checked)}
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
      <Workspace.Content>
        {this.renderTodoItems(todos, activeTodoCount)}
      </Workspace.Content>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}
