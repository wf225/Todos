import * as actionTypes from '../constants/ActionTypes'
import * as timerStatus from '../constants/TimerStatus'
import { Utils } from "../components/Utils";


/*
todo item structure:
{
    id: "uuid",
    title: "text",
    isCompleted: false,
    status: 'Running',
    seconds: 0
};
*/

function addTodo(todos, item) {
    return [
        ...todos,
        { ...item }
    ];
}

function removeTodo(todos, item_id) {
    return todos.filter(function (candidate) {
        return candidate.id !== item_id;
    });
}

function updateTodo(todos, item) {
    return todos.map(function (todo) {
        return todo.id !== item.id ? todo : { ...todo, title: item.title, isCompleted: item.isCompleted };
    });
}

function toggleAll(todos, checked) {
    return todos.map(function (todo) {
        return { ...todo, isCompleted: checked };
    });
}

function clearCompleted(todos, action) {
    return todos.filter(function (todo) {
        return !todo.isCompleted;
    });
}

function timer_tick(todos, action) {
    return todos.map(function (todo) {
        if (todo.isCompleted || todo.status == timerStatus.TIMER_STOPPED || todo.status == timerStatus.TIMER_EXPIRED) {
            return { ...todo };
        }

        let seconds = todo.seconds;
        let status = todo.status;

        if (status == timerStatus.TIMER_RUNNING) {
            seconds = todo.seconds - 1;
            if (seconds <= 0) {
                status = timerStatus.TIMER_EXPIRED;
            }
        }

        return { ...todo, seconds, status };
    });
}

export default function todosReducer(todosState = [], action) {
    switch (action.type) {
        case actionTypes.ADD_TODO_SUCCEEDED:
            return addTodo(todosState, action.payload);

        case actionTypes.DELETE_TODO_SUCCEEDED:
            return removeTodo(todosState, action.payload.id);

        case actionTypes.UPDATE_TODO_SUCCEEDED:
            return updateTodo(todosState, action.payload);

        case actionTypes.TOGGLE_ALL_SUCCEEDED:
            return toggleAll(todosState, action.payload);

        case actionTypes.CLEAR_COMPLETED_SUCCEEDED:
            return clearCompleted(todosState, action);

        case actionTypes.TIMER_TICK:
            return timer_tick(todosState, action);

        case actionTypes.FETCH_TODOS_SUCCEEDED:
          return action.payload;

        default:
            return todosState;
    }
}
