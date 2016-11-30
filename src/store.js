import { createStore, applyMiddleware, compose } from 'redux'
// import thunkMiddleware   from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import createLogger      from 'redux-logger'
import rootReducer       from './reducer'



function createRootStore() {
  const initialState = {};
  const loggerMiddleware = createLogger();

  // chrome redux developer tools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        promiseMiddleware(),
        // thunkMiddleware,
        loggerMiddleware
      )
    )
  );
}

export default {
  create: createRootStore
};
