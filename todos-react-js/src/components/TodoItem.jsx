'use strict';
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import * as key from "../constants/Key"

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            editText: this.props.todo.title
        }
    }

    handleSubmit(event) {
        let val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({ editText: val });
        } else {
            this.props.onDestroy();
        }
    }

    handleDoubleClick() {
        this.props.onEdit();
        this.setState({ editText: this.props.todo.title });
    }

    handleKeyDown(event) {
        if (event.which === key.ESCAPE_KEY) {
            this.setState({ editText: this.props.todo.title });
            this.props.onCancel(event);
        } else if (event.which === key.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }

    handleChange(event) {
        if (this.props.editing) {
            this.setState({ editText: event.target.value });
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            this.editField.focus();
            this.editField.setSelectionRange(this.editField.value.length, this.editField.value.length);
        }
    }


    render() {
        const { todo, editing, onToggle, onDestroy } = this.props

        return (
            <li className={classNames({
                completed: todo.isCompleted,
                editing: editing
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={onToggle}
                    />
                    <label onDoubleClick={this.handleDoubleClick}>
                        {todo.title}
                    </label>
                    <button className="destroy" onClick={onDestroy} />
                </div>
                <input
                    ref={(input) => { this.editField = input; }}
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    editing: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}
