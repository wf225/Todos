import React, { Component, PropTypes } from 'react'
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { Utils } from "./Utils";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./Utils";

export class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.props.model.subscribe(() =>
      this.setState({ todos: this.props.model.todos })
    );

    this.handleChange = this.handleChange.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggle = this.toggle.bind(this);
    this.destroy = this.destroy.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);

    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: ''
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      let route = window.location.hash.substr(1);
      switch (route) {
        case "/active":
          return this.setState({ nowShowing: ACTIVE_TODOS });
        case "/completed":
          return this.setState({ nowShowing: COMPLETED_TODOS });
        default:
          return this.setState({ nowShowing: ALL_TODOS });
      }
    })
  }

  componentDidUpdate(prevProps) {
  }

  componentWillUnmount() {
  }


  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
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

  toggle(todoToToggle) {
    this.props.model.toggle(todoToToggle);
  }

  destroy(todo) {
    this.props.model.destroy(todo);
  }

  edit(todo) {
    this.setState({ editing: todo.id });
  }

  save(todoToSave, text) {
    this.props.model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  cancel() {
    this.setState({ editing: null });
  }

  clearCompleted() {
    this.props.model.clearCompleted();
  }

  render() {
    let todos = this.props.model.todos;

    let shownTodos = todos.filter(function (todo) {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
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
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    }, this);

    let activeTodoCount = todos.reduce(function (accumulator, currentTodo) {
      return currentTodo.completed ? accumulator : accumulator + 1;
    }, 0);

    let completedCount = todos.length - activeTodoCount;
    let app_header;
    let app_main;
    let app_footer;

    if (activeTodoCount || completedCount) {
      app_footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
        />;
    }

    if (todos.length) {
      app_main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    app_header = (
      <header>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.newTodo}
          onKeyDown={this.handleNewTodoKeyDown}
          onChange={this.handleChange}
          autoFocus={true}
        />
      </header>
    );

    return (
      <div>
        {app_header}
        {app_main}
        {app_footer}
      </div>
    );
  }
}

TodoList.propTypes = {
    model: PropTypes.object.isRequired
}
