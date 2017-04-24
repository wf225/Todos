import * as types from '../constants/ActionTypes'
import * as t_status from '../constants/TimerStatus'
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

function addTodo(todos, action) {
    let seconds, status;
    if (action.seconds && action.seconds > 0) {
        status = t_status.TIMER_RUNNING;
    }
    else {
        status: t_status.TIMER_STOPPED;
    }

    seconds = action.seconds;

    return [
        ...todos,
        { id: action.id, title: action.text, isCompleted: false, status, seconds }
    ];
}

function deleteTodo(todos, action) {
    return todos.filter(function (candidate) {
        return candidate.id !== action.item.id;
    });
}

function updateTodo(todos, action) {
    return todos.map(function (todo) {
        return todo.id !== action.item.id ? todo : { ...todo, title: action.text };
    });
}

function toggleTodo(todos, action) {
    return todos.map(function (todo) {
        return todo.id !== action.item.id ? todo : { ...todo, isCompleted: !todo.isCompleted };
    });
}

function toggleAll(todos, action) {
    return todos.map(function (todo) {
        return { ...todo, isCompleted: action.checked };
    });
}

function clearCompleted(todos, action) {
    return todos.filter(function (todo) {
        return !todo.isCompleted;
    });
}

function timer_tick(todos, action) {
    return todos.map(function (todo) {
        if (todo.isCompleted || todo.status == t_status.TIMER_STOPPED || todo.status == t_status.TIMER_EXPIRED) {
            return { ...todo };
        }

        let seconds = todo.seconds;
        let status = todo.status;

        if (status == t_status.TIMER_RUNNING) {
            seconds = todo.seconds - 1;
            if (seconds <= 0) {
                status = t_status.TIMER_EXPIRED;
            }
        }

        return { ...todo, seconds, status };
    });
}

export default function todosReducer(todosState = [], action) {
    switch (action.type) {
        case types.ADD_TODO:
            return addTodo(todosState, action);

        case types.DELETE_TODO:
            return deleteTodo(todosState, action);

        case types.SAVE_TODO:
            return updateTodo(todosState, action);

        case types.TOGGLE_TODO:
            return toggleTodo(todosState, action);

        case types.TOGGLE_ALL:
            return toggleAll(todosState, action);

        case types.CLEAR_COMPLETED:
            return clearCompleted(todosState, action);

        case types.TIMER_TICK:
            return timer_tick(todosState, action);

        default:
            return todosState;
    }
}
