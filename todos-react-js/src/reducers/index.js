import { combineReducers } from 'redux'
import todosReducer from './TodosReducer'
import visibilityReducer from './VisibilityReducer'

// const rootReducer = combineReducers({
//   todos
// })
// export default rootReducer

export default function rootReducer(state = {}, action) {
    return {
        todos: todosReducer(state.todos, action),
        showFilter : visibilityReducer(state.showFilter, action)
    }
}