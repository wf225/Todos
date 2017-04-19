import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { Utils } from '../components/Utils';
import { SHOW_ALL } from "../constants/TodoFilters";
import rootReducer from '../reducers'
import { logger, crashReporter } from "../middlewares/logger"
import sagaMonitor from '../sagaMonitor'
import * as t_status from '../constants/TimerStatus'

// preloadedState
let preloadedState = {
    todos: [], // Utils.store('react-todos'),
    showFilter: SHOW_ALL,
    timerStatus: t_status.TIMER_STOPPED
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    return {
        ...createStore(
            rootReducer,
            preloadedState,
            applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run
    }
}