import { all } from 'redux-saga/effects'
import example from './example'

export const rootSaga = function*() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    ...example,
  ])
}
