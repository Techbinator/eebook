import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware   from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import createLogger      from 'redux-logger'
import rootReducer       from './reducer'



function createRootStore() {
  const initialState = {};
  const loggerMiddleware = createLogger();

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      promiseMiddleware(),
      // thunkMiddleware,
      loggerMiddleware
    )
  );
} 

export default {
  create: createRootStore
};