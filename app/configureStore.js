import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import { composeWithDevTools } from 'remote-redux-devtools'

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  transforms: [
    /**
     * This is necessary to support immutable reducers.
     * @see https://github.com/rt2zz/redux-persist-transform-immutable
     */
    immutableTransform(),
  ],
  key: 'root',
  storage: storage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [],
}

export const configureStore = (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  enhancers.push(composeEnhancers(applyMiddleware(...middleware)))

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
