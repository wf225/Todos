import * as actions from '../src/actions'
import * as types from '../src/constants/ActionTypes'

describe('actions', () => {

    test('create an action to add', () => {
        const text = 'Finish docs';
        const id = 123;
        const expectedAction = {
            type: types.ADD_TODO,
            text,
            id
        }
        expect(actions.add(id, text)).toEqual(expectedAction)
    })
    
})