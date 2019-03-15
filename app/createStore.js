import { configureStore } from './configureStore'
import { rootReducer } from './stores'
import { rootSaga } from './sagas'

export const createStore = () => configureStore(rootReducer, rootSaga)
