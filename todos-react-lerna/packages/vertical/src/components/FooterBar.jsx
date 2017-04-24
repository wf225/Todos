'use strict';
import React from 'react'
import classNames from 'classnames'
import { Utils } from "./Utils";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "../constants/TodoFilters";
import { Slot, Fill } from 'react-slot-fill'
import Workspace from 'todos-platform';

class FooterBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { filter, actions } = this.props;

        return (
            <ul className="filters">
                <Slot name='FooterBar.FilterButton' />
            </ul>
        );
    }
}


FooterBar.FilterButton = (props) => (
    <Fill name="FooterBar.FilterButton">
        <li>
            <a
                onClick={() => props.onClick()}
                className={props.classNames}>
                {props.label}
			</a>
        </li>
    </Fill>
)

export default FooterBar;