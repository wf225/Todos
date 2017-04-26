import * as types from '../constants/ActionTypes'
import * as timerStatus from '../constants/TimerStatus'

function timer_start(state, action) {
    return timerStatus.TIMER_RUNNING;
}

function timer_stop(state, action) {
    return timerStatus.TIMER_STOPPED;
}

export default function timerReducer(timerState, action) {
    switch (action.type) {
        case types.TIMER_START:
            return timer_start(timerState, action);

        case types.TIMER_START:
            return timer_stop(timerState, action);

        default:
            return timerState;
    }
};
