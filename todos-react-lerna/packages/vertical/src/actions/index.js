import * as actionTypes from '../constants/ActionTypes'
import * as timerStatus from '../constants/TimerStatus'
import fetch from 'isomorphic-fetch'
import { Request } from './fetchRequest'

//
export const fetchAll = (id, title, seconds) => {
    return { type: actionTypes.FETCH_TODOS }
}

//
export const add = (id, title, seconds) => {
    let status = (seconds && seconds > 0) ? timerStatus.TIMER_RUNNING : timerStatus.TIMER_STOPPED;
    return { type: actionTypes.ADD_TODO, data: { id, title, seconds, status, isCompleted: false } }
}

//
export const remove = (item) => {
    return { type: actionTypes.DELETE_TODO, data: { id: item.id } }
}


//
export const update = (item, text) => {
    return { type: actionTypes.UPDATE_TODO, data: { ...item, title: text } }
}

//
export const toggle = (item, checked) => (
    { type: actionTypes.TOGGLE_TODO, data: { ...item, isCompleted: checked } }
)

//
export const toggleAll = (checked) => {
    return { type: actionTypes.TOGGLE_ALL, data: { isCompleted: checked } }
}

//
export const clearCompleted = () => {
    return { type: actionTypes.CLEAR_COMPLETED }
}

//
export const setVisibilityFilter = (filter) => (
    { type: actionTypes.SET_VISIBILITY_FILTER, filter }
)

// Timer
export const timer_start = () => (
    { type: actionTypes.TIMER_START }
)

export const timer_tick = () => (
    { type: actionTypes.TIMER_TICK }
)

export const timer_stop = () => (
    { type: actionTypes.TIMER_STOP }
)