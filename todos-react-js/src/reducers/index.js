import { combineReducers } from 'redux'
import todos from './TodoList'

const rootReducer = combineReducers({
  todos
})

export default rootReducer
