'use strict';
import React from 'react'
import classNames from 'classnames'
import { ENTER_KEY, ESCAPE_KEY } from "./Utils";

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = { editText: this.props.todo.title };
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

    handleEdit() {
        this.props.onEdit();
        this.setState({ editText: this.props.todo.title });
    }

    handleKeyDown(event) {
        if (event.which === ESCAPE_KEY) {
            this.setState({ editText: this.props.todo.title });
            this.props.onCancel(event);
        } else if (event.which === ENTER_KEY) {
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
            let node = ReactDOM.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }


    render() {
        return (
            <li className={classNames({
                completed: this.props.todo.completed,
                editing: this.props.editing
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {this.props.todo.title}
                    </label>
                    <button className="destroy" onClick={this.props.onDestroy} />
                </div>
                <input
                    ref="editField"
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
