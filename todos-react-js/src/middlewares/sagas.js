import { takeEvery } from 'redux-saga'
import { select, take, call, put } from 'redux-saga/effects'

// function* watchAndLog() {
//   yield* takeEvery('*', function* logger(action) {
//     const state = yield select()

//     console.log('action', action)
//     console.log('state after', state)
//   })
// }

export function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('next state', state)
  }
}

export function* rootSaga() {
  yield [
    watchAndLog()
  ]
}