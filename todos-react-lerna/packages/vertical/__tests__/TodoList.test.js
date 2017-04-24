import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import jest from 'jest-mock';
import { shallow, mount } from 'enzyme';

import { TodoModel } from '../src/components/TodoModel';
import { TodoItem } from "../src/components/TodoItem";
import { TodoList } from '../src/components/TodoList';
import { Utils } from "../src/components/Utils";
import * as TodoActions from '../src/actions'


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
        model.add("Todo-item-1");
        model.add("Todo-item-2");

        const myMock = jest.fn();
        model.subscribe(myMock);
    });

    test('todo list snapshot', () => {
        const component = renderer.create(
            <TodoList todos={model.todos} actions={TodoActions} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});