'use strict';
import React from 'react'
import classNames from 'classnames'
import { Utils } from "./Utils";
import { TODOS_ALL, TODOS_ACTIVE, TODOS_COMPLETED, ENTER_KEY } from "../constants/TodoFilters";

export class TodoFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let activeTodoWord = Utils.pluralize(this.props.count, 'item');
        let clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed
					</button>
            );
        }

        let show_filter = this.props.filter;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong>{activeTodoWord} left
				</span>
                <ul className="filters">
                    <li>
                        <a
                            onClick={() => this.props.onShow(TODOS_ALL)}
                            className={classNames({ selected: show_filter === TODOS_ALL })}>
                            All
						</a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => this.props.onShow(TODOS_ACTIVE)}
                            className={classNames({ selected: show_filter === TODOS_ACTIVE })}>
                            Active
							</a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => this.props.onShow(TODOS_COMPLETED)}
                            className={classNames({ selected: show_filter === TODOS_COMPLETED })}>
                            Completed
							</a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }

}
