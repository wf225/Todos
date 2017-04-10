import React, { Component, PropTypes } from 'react'
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { TODOS_ALL, TODOS_ACTIVE, TODOS_COMPLETED } from "../constants/TodoFilters";
import * as key from "../constants/Key"

export class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.props.model.subscribe(() =>
      this.setState({ todos: this.props.model.todos })
    );

    this.state = {
      nowShowing: TODOS_ALL,
      editing: null,
      newTodo: ''
    };
  }

  componentDidMount() {
    // window.addEventListener('hashchange', () => {
    //   let route = window.location.hash.substr(1);
    //   switch (route) {
    //     case "/active":
    //       return this.setState({ nowShowing: ACTIVE_TODOS });
    //     case "/completed":
    //       return this.setState({ nowShowing: COMPLETED_TODOS });
    //     default:
    //       return this.setState({ nowShowing: ALL_TODOS });
    //   }
    // })
  }

  componentDidUpdate(prevProps) {
  }

  componentWillUnmount() {
  }


  handleShow(filter) {
    this.setState({ nowShowing: filter });
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
      this.props.model.addTodo(val);
      this.setState({ newTodo: '' });
    }
  }

  toggleAll(event) {
    let checked = event.target.checked;
    this.props.model.toggleAll(checked);
  }

  handleToggle(todoToToggle) {
    this.props.model.toggle(todoToToggle);
  }

  handleDestroy(todo) {
    this.props.model.destroy(todo);
  }

  handleEdit(todo) {
    this.setState({ editing: todo.id });
  }

  handleSave(todoToSave, text) {
    this.props.model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  handleCancel() {
    this.setState({ editing: null });
  }

  handleClearCompleted() {
    this.props.model.clearCompleted();
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

  renderFooter(activeTodoCount, completedCount) {
    if (activeTodoCount || completedCount) {
      return (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          filter={this.state.nowShowing}
          onShow={this.handleShow.bind(this)}
        />
      );
    }
  }

  renderTodoItems(todos, activeTodoCount) {
    let shownTodos = todos.filter(function (todo) {
      switch (this.state.nowShowing) {
        case TODOS_ACTIVE:
          return !todo.completed;
        case TODOS_COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    }, this);

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
            onChange={this.toggleAll.bind(this)}
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
    let todos = this.props.model.todos;
    let activeTodoCount = todos.reduce(function (accumulator, currentTodo) {
      return currentTodo.completed ? accumulator : accumulator + 1;
    }, 0);
    let completedCount = todos.length - activeTodoCount;

    return (
      <div>
        {this.renderHeader()}
        {this.renderTodoItems(todos, activeTodoCount)}
        {this.renderFooter(activeTodoCount, completedCount)}
      </div>
    );
  }
}

TodoList.propTypes = {
  model: PropTypes.object.isRequired
}
