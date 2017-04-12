import React from 'react';
import ReactDOM from 'react-dom';
import * as key from "../constants/Key"
import { Utils } from "../components/Utils";

export class TodoHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTodo: ''
        };
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
            this.props.actions.add(Utils.uuid(), val);
            this.setState({ newTodo: '' });
        }
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

    render() {
        return (
            <div>
                <h1 className="header">Todo list</h1>
                {this.renderHeader()}
            </div>
        );
    }
}
