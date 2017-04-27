import * as actionTypes from '../constants/ActionTypes'
import * as timerStatus from '../constants/TimerStatus'
import fetch from 'isomorphic-fetch'
import { Request } from './fetchRequest'

//
// export const fetchAll = () => {
//     return (dispatch) => {
//         Request.get("/api/todos")
//             .then((response) => response.json())
//             .then((data) => dispatch({ type: actionTypes.FETCH_TODOS, payload: data }))
//             .catch((err) => dispatch({ type: actionTypes.FETCH_TODOS_FAILED, payload: err }))
//     }
// }
export const fetchAll = (id, title, seconds) => (
    { type: actionTypes.FETCH_TODOS }
)

//
export const add = (id, title, seconds) => {
    // { type: actionTypes.ADD_TODO, id, title, seconds }
    let status;
    if (seconds && seconds > 0) {
        status = timerStatus.TIMER_RUNNING;
    }
    else {
        status: timerStatus.TIMER_STOPPED;
    }

    let item = { id, title, seconds, status, isCompleted: false };
    return (dispatch) => {
        Request.post("/api/todos", item)
            .then((response) => response.json())
            .then((data) => dispatch({ type: actionTypes.ADD_TODO, payload: data }))
            .catch((err) => dispatch({ type: actionTypes.FETCH_TODOS_FAILED, payload: err }))
    }
}

//
export const remove = (item) => {
    // { type: actionTypes.DELETE_TODO, item }
    return (dispatch) => {
        Request.delete("/api/todo/" + item.id)
            .then((response) => response.json())
            .then((data) => dispatch({ type: actionTypes.DELETE_TODO, payload: data.id }))
            .catch((err) => dispatch({ type: actionTypes.FETCH_TODOS_FAILED, payload: err }))
    }
}

const updateTodo = (item) => {
    return (dispatch) => {
        Request.put("/api/todo/" + item.id, item)
            .then((response) => response.json())
            .then((data) => dispatch({ type: actionTypes.UPDATE_TODO, payload: data }))
            .catch((err) => dispatch({ type: actionTypes.FETCH_TODOS_FAILED, payload: err }))
    }
}

//
export const update = (item, text) => (
    // { type: actionTypes.UPDATE_TODO, payload: { ...item, title: text } }
    updateTodo({ ...item, title: text })
)

//
export const toggle = (item, checked) => (
    // { type: actionTypes.TOGGLE_TODO, payload: { ...item, isCompleted: checked } }
    updateTodo({ ...item, isCompleted: checked })
)

//
export const toggleAll = (checked) => {
    // { type: actionTypes.TOGGLE_ALL, payload: checked }
    return (dispatch) => {
        Request.patch("/api/todos/", { isCompleted: checked })
            .then((response) => response.json())
            .then((data) => dispatch({ type: actionTypes.TOGGLE_ALL, payload: data.isCompleted }))
            .catch((err) => dispatch({ type: actionTypes.FETCH_TODOS_FAILED, payload: err }))
    }
}

//
export const clearCompleted = () => {
    // { type: actionTypes.CLEAR_COMPLETED }
    return (dispatch) => {
        Request.delete("/api/todos")
            .then((response) => response.json())
            .then((data) => dispatch({ type: actionTypes.CLEAR_COMPLETED }))
            .catch((err) => dispatch({ type: actionTypes.FETCH_TODOS_FAILED, payload: err }))
    }
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