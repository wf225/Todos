
/**
 * Output all actions and the next state.
 */
export const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

/**
 * Send crash report before the listener be notified.
 */
export const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        console.log('extra', {
            action,
            state: store.getState()
        });
        throw err
    }
}