import { TodoModel } from '../components/TodoModel';
import * as types from '../constants/ActionTypes'

let model = new TodoModel('react-todos');

export default function todos(state = model.todos, action) {
    switch (action.type) {
        case types.ADD_TODO:
            model.add(action.text);
            break;

        case types.DELETE_TODO:
            model.remove(action.item);
            break;

        case types.EDIT_TODO:
            model.edit(action.item, action.text);
            break;

        case types.COMPLETE_TODO:
            model.toggle(action.item);
            break;

        case types.COMPLETE_ALL:
            model.toggleAll(action.checked);
            break;

        case types.CLEAR_COMPLETED:
            model.clearCompleted();
            break;

        default:
            break;
    }

    return model.todos;
}
