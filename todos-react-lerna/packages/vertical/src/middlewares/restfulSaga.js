import { takeEvery } from 'redux-saga'
import { actionChannel, call, take, put, race, select } from 'redux-saga/effects'
import * as actionTypes from '../constants/ActionTypes'
import { Request } from '../utils/fetchRequest'
import util from 'util'

// restful api
//
function* fetchAll(action) {
  try {
    const result = yield call(() =>
      Request.get("/api/todos")
        .then((response) => response.json())
    );
    yield put({ type: actionTypes.FETCH_TODOS_SUCCEEDED, payload: result });
  }
  catch (e) {
    yield put({ type: actionTypes.FETCH_TODOS_FAILED, payload: error });
  }
}

//
function* add(action) {
  const result = yield call(() =>
    Request.post("/api/todos", action.data)
      .then((response) => response.json())
  );
  yield put({ type: actionTypes.ADD_TODO_SUCCEEDED, payload: result });
}

//
function* remove(action) {
  const result = yield call(() =>
    Request.delete(util.format("/api/todo/%s/%s", action.data.id, action.data.title))
      .then((response) => response.json())
  );
  yield put({ type: actionTypes.DELETE_TODO_SUCCEEDED, payload: result });
}

//
const updateTodo = (item) => {
  return Request.put("/api/todo/" + item.id, item)
    .then((response) => response.json());
}

function* update(action) {
  const result = yield call(updateTodo, action.data);
  yield put({ type: actionTypes.UPDATE_TODO_SUCCEEDED, payload: result });
}

//
function* toggleAll(action) {
  const result = yield call(() =>
    Request.patch("/api/todos/", { isCompleted: action.data.isCompleted })
      .then((response) => response.json())
  );
  yield put({ type: actionTypes.TOGGLE_ALL_SUCCEEDED, payload: result.isCompleted });
}

//
function* clearCompleted(action) {
  const result = yield call(() =>
    Request.delete("/api/todos")
      .then((response) => response.json())
  );
  yield put({ type: actionTypes.CLEAR_COMPLETED_SUCCEEDED, payload: result });
}


export function* restfulSaga() {
  yield* [
    takeEvery(actionTypes.FETCH_TODOS, fetchAll),
    takeEvery(actionTypes.ADD_TODO, add),
    takeEvery(actionTypes.DELETE_TODO, remove),
    takeEvery(actionTypes.UPDATE_TODO, update),
    takeEvery(actionTypes.TOGGLE_TODO, update),
    takeEvery(actionTypes.TOGGLE_ALL, toggleAll),
    takeEvery(actionTypes.CLEAR_COMPLETED, clearCompleted)
  ];
}
