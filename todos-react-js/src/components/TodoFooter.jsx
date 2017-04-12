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
        let { filter, activeCount, completedCount, actions } = this.props;

        let activeTodoWord = Utils.pluralize(activeCount, 'item');
        let clearButton = null;

        if (completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={() => actions.clearCompleted()}>
                    Clear completed
					</button>
            );
        }

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{activeCount}</strong>{activeTodoWord} left
				</span>
                <ul className="filters">
                    <li>
                        <a
                            onClick={() => actions.setVisibilityFilter(TODOS_ALL)}
                            className={classNames({ selected: filter === TODOS_ALL })}>
                            All
						</a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => actions.setVisibilityFilter(TODOS_ACTIVE)}
                            className={classNames({ selected: filter === TODOS_ACTIVE })}>
                            Active
							</a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => actions.setVisibilityFilter(TODOS_COMPLETED)}
                            className={classNames({ selected: filter === TODOS_COMPLETED })}>
                            Completed
							</a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }

}
