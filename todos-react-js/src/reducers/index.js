import { combineReducers } from 'redux'
import todosReducer from './TodosReducer'
import visibilityReducer from './VisibilityReducer'
import timerReducer from './TimerReducer'

// const rootReducer = combineReducers({
//   todos
// })
// export default rootReducer

export default function rootReducer(state = {}, action) {
    return {
        //...state,
        todos: todosReducer(state.todos, action),
        showFilter : visibilityReducer(state.showFilter, action),
        timerStatus: timerReducer(state.timerStatus, action)
    }
}