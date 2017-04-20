import React from 'react';
import ReactDOM from 'react-dom';
import * as key from "../constants/Key"
import { Utils } from "../components/Utils";
import Workspace from './Workspace';

export class TodoHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTodo: '',
            seconds: ''
        };
    }

    handleTextChange(event) {
        this.setState({ newTodo: event.target.value });
    }

    handleTimeChange(event) {
        this.setState({ seconds: event.target.value });
    }

    handleNewTodoKeyDown(event) {
        if (event.keyCode !== key.ENTER_KEY) {
            return;
        }
        event.preventDefault();

        let val = this.state.newTodo.trim();
        let seconds = this.state.seconds.trim();
        if (val) {
            this.props.actions.add(Utils.uuid(), val, seconds);
            this.setState({ newTodo: '' });
        }
    }

    renderHeader() {
        return (
            <div>
                <h1 className="header">Todo list</h1>
                <div>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown.bind(this)}
                        onChange={this.handleTextChange.bind(this)}
                        autoFocus={true}
                    />
                    <input
                        className="new-todo-timer"
                        value={this.state.seconds}
                        onKeyDown={this.handleNewTodoKeyDown.bind(this)}
                        onChange={this.handleTimeChange.bind(this)}
                    />
                    seconds
                </div>
            </div>
        );
    }

    render() {
        return (
            <Workspace.Header>
                {this.renderHeader()}
            </Workspace.Header>
        );
    }
}
