import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import jest from 'jest-mock';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { TodoModel } from '../src/components/TodoModel';
import { TodoItem } from "../src/components/TodoItem";
import * as key from "../src/constants/Key"

// Applies to all tests in this file
beforeEach(() => {

});

describe('TodoItem tests', () => {

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

        todo = model.todos[0];
        wrapper = mount(
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={jest.fn(() => { todo.completed = !todo.completed; })}
                onDestroy={jest.fn(() => { todo = null; })}
                onEdit={jest.fn()}
                editing={false}
                onSave={jest.fn((val) => { todo.title = val; })}
                onCancel={jest.fn()}
            />
        );
    });

    test('todo item title', () => {
        expect(wrapper.text()).toEqual("Todo-item-1");
        expect(wrapper.find('label').text()).toEqual("Todo-item-1");
        expect(wrapper.props().todo.title).toEqual("Todo-item-1");
    });

    test('todo item toggle', () => {
        const checkbox = wrapper.find('input').filter('.toggle').first();
        // const checkbox = wrapper.find('[className="toggle"]');
        expect(checkbox.length).toEqual(1);

        checkbox.simulate('change');
        expect(wrapper.props().todo.completed).toEqual(true);
        expect(todo.completed).toEqual(true);

        // restore the checkbox to uncheck.
        checkbox.simulate('change');
    });

    test('todo item edit 1', () => {
        const editbox = wrapper.find('input').filter('.edit').first();
        wrapper.setState({ editText: "Todo-item-1-update1" });
        editbox.simulate('blur');
        // wrapper.update();
        expect(todo.title).toEqual("Todo-item-1-update1");
        expect(wrapper.text()).toEqual("Todo-item-1-update1");
    });

    xtest('todo item edit 2', () => {
        let editbox = wrapper.find('input').filter('.edit').first();

        wrapper.props().todo.title = "Todo-item-1-update2";
        editbox.simulate('keyDown', { key: "Enter", keyCode: key.ENTER_KEY, which: key.ENTER_KEY });
        expect(wrapper.text()).toEqual("Todo-item-1-update2");
    });

    test('todo item escape keydown', () => {
        const editbox = wrapper.find('input').filter('.edit').first();
        wrapper.setState({ editText: "Todo-item-1-update3" });
        editbox.simulate('keyDown', { key: "Esc", keyCode: key.ESCAPE_KEY, which: key.ESCAPE_KEY });
        expect(todo.title).toEqual("Todo-item-1-update1");
    });

    test('todo item enter keydown', () => {
        const editbox = wrapper.find('input').filter('.edit').first();
        wrapper.setState({ editText: "Todo-item-1-update3" });
        editbox.simulate('keyDown', { key: "Enter", keyCode: key.ENTER_KEY, which: key.ENTER_KEY });
        expect(todo.title).toEqual("Todo-item-1-update3");
    });

    test('todo item destroy', () => {
        const destroyBtn = wrapper.find('button').filter('.destroy').first();
        destroyBtn.simulate('click');
        expect(todo).toBeNull();
    });

});