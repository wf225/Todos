import React from 'react';
import jest from 'jest-mock';
import { TodoModel } from '../src/components/TodoModel';

// Applies to all tests in this file
beforeEach(() => {

});

describe('TodoModel tests', () => {

    // Applies only to tests in this describe block
    let model;
    beforeAll(() => {
        model = new TodoModel("react-todos");
        model.addTodo("Todo-item-1");
        model.addTodo("Todo-item-2");

        const myMock = jest.fn();
        model.subscribe(myMock);
    });

    test('add todo item', () => {        
        expect(model.key).toEqual("react-todos");
        expect(model.todos.length).toEqual(2);
        expect(model.onChanges.length).toEqual(1);

        expect(model.todos[0].title).toEqual("Todo-item-1");
        expect(model.todos[0].completed).toEqual(false);
        expect(model.todos[1].title).toEqual("Todo-item-2");
        expect(model.todos[1].completed).toEqual(false);
    });

    test('toggle todo item', () => {
        model.toggle(model.todos[0]);
        expect(model.todos[0].completed).toEqual(true);
    });

    test('toggle all items', () => {
        model.toggleAll(true);
        expect(model.todos[0].completed).toEqual(true);
        expect(model.todos[1].completed).toEqual(true);
    });

    test('destroy todo item', () => {
        model.destroy(model.todos[0]);
        expect(model.todos.length).toEqual(1);
    });

    test('clear todo items', () => {
        model.clearCompleted();
        expect(model.todos.length).toEqual(0);
    });

});