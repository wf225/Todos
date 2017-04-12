import reducer from '../src/reducers/TodosReducer'
import * as types from '../src/constants/ActionTypes'

describe('todos reducer', () => {

    it('should return the initial state', () => {
        const todos = [
            {
                title: 'Use Redux',
                isCompleted: false,
                id: 0
            }
        ];
        expect(
            reducer(todos, {})
        ).toEqual(todos)
    })

    it('should handle ADD_TODO', () => {
        expect(
            reducer([], {
                type: types.ADD_TODO,
                text: 'Run the tests',
                id: 0
            })
        ).toEqual(
            [
                {
                    title: 'Run the tests',
                    isCompleted: false,
                    id: 0
                }
            ]
        )

        expect(
            reducer(
                [
                    {
                        title: 'Use Redux',
                        isCompleted: false,
                        id: 0
                    }
                ],
                {
                    type: types.ADD_TODO,
                    text: 'Run the tests',
                    id: 1
                }
            )
        ).toEqual(
            [
                {
                    title: 'Use Redux',
                    isCompleted: false,
                    id: 0
                },
                {
                    title: 'Run the tests',
                    isCompleted: false,
                    id: 1
                }
            ]
        )
    })

})