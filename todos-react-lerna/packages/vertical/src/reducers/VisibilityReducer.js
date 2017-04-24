import * as types from '../constants/ActionTypes'

function setVisibilityFilter(state, action) {
    return action.filter;
}

export default function visibilityReducer(state, action) {
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER:
            return setVisibilityFilter(state, action);

        default:
            return state;
    }
};
