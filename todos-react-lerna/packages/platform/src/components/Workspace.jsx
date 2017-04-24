import React, { Component, PropTypes } from 'react'
import { Slot, Fill } from 'react-slot-fill'

class Workspace extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Slot name="Workspace.Header" />
                <Slot name="Workspace.Content" />
                <Slot name="Workspace.Footer" />
            </div>
        );
    }
}

Workspace.Header = (props) => (
    <Fill name="Workspace.Header">
        <div>{props.children}</div>
    </Fill>
)

Workspace.Content = (props) => (
    <Fill name="Workspace.Content">
        <div>{props.children}</div>
    </Fill>
)

Workspace.Footer = (props) => (
    <Fill name="Workspace.Footer">
        <div>{props.children}</div>
    </Fill>
)

export default Workspace;