import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import jest from 'jest-mock';
import { shallow, mount } from 'enzyme';

import { TodoModel } from '../src/components/TodoModel';
import { TodoItem } from "../src/components/TodoItem";
import { TodoList } from '../src/components/TodoList';
import { Utils } from "../src/components/Utils";


// Applies to all tests in this file
beforeEach(() => {

});

describe('TodoList tests', () => {

    // Applies only to tests in this describe block
    let model;
    let todo;
    let wrapper;
    beforeAll(() => {
        model = new TodoModel("react-todos");
        model.addTodo("Todo-item-1");
        model.addTodo("Todo-item-2");

        const myMock = jest.fn();
        model.subscribe(myMock);
    });

    test('todo list snapshot', () => {
        const component = renderer.create(
            <TodoList model={model} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});