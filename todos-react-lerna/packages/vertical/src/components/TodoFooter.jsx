import React from 'react'
import classNames from 'classnames'
import { Utils } from "./Utils";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "../constants/TodoFilters";
import { Slot, Fill } from 'react-slot-fill'
import Workspace from 'todos-platform';
import FooterBar from './FooterBar';

export class TodoFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    /*renderFilterButtons(filter, actions) {
        return (
            <ul className="filters">
                <li>
                    <a
                        onClick={() => actions.setVisibilityFilter(SHOW_ALL)}
                        className={classNames({ selected: filter === SHOW_ALL })}>
                        All
						</a>
                </li>
                {' '}
                <li>
                    <a
                        onClick={() => actions.setVisibilityFilter(SHOW_ACTIVE)}
                        className={classNames({ selected: filter === SHOW_ACTIVE })}>
                        Active
							</a>
                </li>
                {' '}
                <li>
                    <a
                        onClick={() => actions.setVisibilityFilter(SHOW_COMPLETED)}
                        className={classNames({ selected: filter === SHOW_COMPLETED })}>
                        Completed
							</a>
                </li>
            </ul>
        );
    }*/

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
            <Workspace.Footer>
                <footer className="footer">
                    <span className="todo-count">
                        <strong>{activeCount}</strong>{activeTodoWord} left
				    </span>

                    {/*{this.renderFilterButtons(filter, actions)}*/}
                    <ul className="filters">
                        <FooterBar />
                        <FooterBar.FilterButton
                            label="All"
                            onClick={() => actions.setVisibilityFilter(SHOW_ALL)}
                            className={classNames({ selected: filter === SHOW_ALL })} />
                        <FooterBar.FilterButton
                            label="Active"
                            onClick={() => actions.setVisibilityFilter(SHOW_ACTIVE)}
                            className={classNames({ selected: filter === SHOW_ACTIVE })} />
                        <FooterBar.FilterButton
                            label="Completed"
                            onClick={() => actions.setVisibilityFilter(SHOW_COMPLETED)}
                            className={classNames({ selected: filter === SHOW_COMPLETED })} />
                    </ul>

                    {clearButton}
                </footer>
            </Workspace.Footer>
        );
    }
}
