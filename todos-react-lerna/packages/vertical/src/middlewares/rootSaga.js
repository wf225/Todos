import { takeEvery } from 'redux-saga'
import { actionChannel, call, take, put, race, select } from 'redux-saga/effects'
import * as actionTypes from '../constants/ActionTypes'
import * as actions from '../actions'
import * as timerStatus from '../constants/TimerStatus'
import { restfulSaga } from './restfulSaga'

// log
export function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('next state', state)
  }
}

// timer
const delay = (ms) => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
)

export function* startTimer() {
  const channel = yield actionChannel(actionTypes.ADD_TODO);

  while (yield take(channel)) {
    const state = yield select()
    // start the global timer.
    if (state.timerStatus == timerStatus.TIMER_STOPPED) {
      yield put(actions.timer_start());
    }
  }
}

function* watchTimer() {
  const channel = yield actionChannel(actionTypes.TIMER_START);
  while (yield take(channel)) {

    while (true) {
      const winner = yield race({
        stopped: take(actionTypes.TIMER_STOP),
        tick: call(delay, 1000)
      });

      if (!winner.stopped) {
        yield put(actions.timer_tick());
      } else {
        break;
      }
    }

  }
}


export function* rootSaga() {
  yield [
    watchAndLog(),
    startTimer(),
    watchTimer(),
    restfulSaga()
  ]
}