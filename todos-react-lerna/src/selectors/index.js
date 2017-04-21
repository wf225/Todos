import { createSelector } from 'reselect'
import * as filters from "../constants/TodoFilters";

const getVisibilityFilter = (state) => state.showFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (showFilter, todos) => {
        switch (showFilter) {
            case filters.SHOW_ALL:
                return todos
            case filters.SHOW_COMPLETED:
                return todos.filter(t => t.isCompleted)
            case filters.SHOW_ACTIVE:
                return todos.filter(t => !t.isCompleted)
        }
    }
)
