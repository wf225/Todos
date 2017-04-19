import * as types from '../constants/ActionTypes'

// Action Creator

//
export const add = (id, text, seconds) => (
    { type: types.ADD_TODO, id, text, seconds }
)

//
export const remove = (item) => (
    { type: types.DELETE_TODO, item }
)

//
export const save = (item, text) => (
    { type: types.SAVE_TODO, item, text }
)

//
export const toggle = (item) => (
    { type: types.TOGGLE_TODO, item }
)

//
export const toggleAll = (checked) => (
    { type: types.TOGGLE_ALL, checked }
)

//
export const clearCompleted = () => (
    { type: types.CLEAR_COMPLETED }
)

//
export const setVisibilityFilter = (filter) => (
    { type: types.SET_VISIBILITY_FILTER, filter }
)

// Timer
export const timer_start = () => (
    { type: types.TIMER_START }
)

export const timer_tick = () => (
    { type: types.TIMER_TICK }
)

export const timer_stop = () => (
    { type: types.TIMER_STOP }
)