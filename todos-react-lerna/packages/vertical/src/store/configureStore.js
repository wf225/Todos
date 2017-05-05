import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'

import { Utils } from '../components/Utils';
import { SHOW_ALL } from "../constants/TodoFilters";
import rootReducer from '../reducers'
import { logger, crashReporter } from "../middlewares/logger"
import sagaMonitor from '../utils/sagaMonitor'
import * as timerStatus from '../constants/TimerStatus'


// preloadedState
let preloadedState = {
    todos: [], // Utils.store('react-todos'),
    showFilter: SHOW_ALL,
    timerStatus: timerStatus.TIMER_STOPPED
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    return {
        ...createStore(
            rootReducer,
            preloadedState,
            applyMiddleware(sagaMiddleware, thunkMiddleware)),
        runSaga: sagaMiddleware.run
    }
}