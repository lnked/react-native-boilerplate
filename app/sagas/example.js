import { delay, put, takeLatest } from 'redux-saga/effects'
import { exampleActions, exampleTypes } from 'app/stores/example'

const incrementAsync = function*({ steps, delayMs }) {
  while (true) {
    yield put(exampleActions.increment(steps))
    yield delay(delayMs)
  }
}

export default [
  // Start the increment saga when the user click the button
  takeLatest(exampleTypes.INCREMENT_ASYNC, incrementAsync),
]
