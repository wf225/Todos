"use strict";
import { Utils } from "./Utils";

// let todo_item = {
//     id: Utils.uuid(),
//     title: text,
//     isCompleted: false
// };

export class TodoModel {

    constructor(key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        }
    }

    inform() {
        Utils.store(this.key, this.todos);
        this.listeners.forEach((fn) => { fn(); });
    }

    add(text) {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title: text,
            isCompleted: false
        });

        this.inform();
    }

    toggleAll(checked) {
        this.todos = this.todos.map(function (todo) {
            return { ...todo, isCompleted: checked };
        });

        this.inform();
    }

    toggle(todoToToggle) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToToggle ? todo : { ...todo, isCompleted: !todo.isCompleted };
        });

        this.inform();
    }

    remove(todo) {
        this.todos = this.todos.filter(function (candidate) {
            return candidate !== todo;
        });

        this.inform();
    }

    edit(todoToSave, text) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToSave ? todo : { ...todo, title: text };
        });

        this.inform();
    }

    clearCompleted() {
        this.todos = this.todos.filter(function (todo) {
            return !todo.isCompleted;
        });

        this.inform();
    }

}
