import { createStore, applyMiddleware, compose,combineReducers } from 'redux'
import reducers from '../reducers';
import thunk from 'redux-thunk'
import api from '../middleware/api'
import createLogger from 'redux-logger'

function reduxStore(initialState) {
  //const store = createStore(reducers, initialState,
  //  window.devToolsExtension && window.devToolsExtension());

  //改为这样
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        api,
        createLogger()
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}



export default reduxStore;
