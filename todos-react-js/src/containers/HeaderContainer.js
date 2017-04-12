import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TodoHeader } from '../components/TodoHeader';
import * as TodoActions from '../actions'


const mapStateToProps = (state) => {
    return ({
    });
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoHeader)
