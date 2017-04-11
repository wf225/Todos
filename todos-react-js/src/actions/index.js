import * as types from '../constants/ActionTypes'

// Action Creator

//
export const add = (text) => (
    { type: types.ADD_TODO, text }
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
    { type: types.COMPLETE_TODO, item }
)

//
export const toggleAll = (checked) => (
    { type: types.COMPLETE_ALL, checked }
)

//
export const clearCompleted = () => (
    { type: types.CLEAR_COMPLETED }
)
