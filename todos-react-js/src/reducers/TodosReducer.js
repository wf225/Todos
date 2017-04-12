import * as types from '../constants/ActionTypes'
import { Utils } from "../components/Utils";


/*
todo item structure:
{
    id: "uuid",
    title: "text",
    isCompleted: false
};
*/

function addTodo(todos, action) {
    return [
        ...todos,
        { id: Utils.uuid(), title: action.text, isCompleted: false }
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

        default:
            return todosState;
    }
}
