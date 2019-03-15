import { createActions, createReducer } from 'reduxsauce'
import { Map } from 'immutable'

/**
 * The initial values for the redux state.
 */
export const initialState = Map({
  counter: 0,
})

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable.
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
export const { Types: exampleTypes, Creators: exampleActions } = createActions({
  // signals
  incrementAsync: ['steps', 'delayMs'],
  // actions
  increment: ['steps'],
  reset: [],
})

/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export default createReducer(initialState, {
  [exampleTypes.INCREMENT]: (state, { steps }) => {
    return state.updateIn(['counter'], (counter) => counter + steps)
  },
  [exampleTypes.RESET]: (state, { steps }) => {
    return state.updateIn(['counter'], () => 0)
  },
})

/**
 * Selectors let us factorize logic that queries the state.
 * They can be used in sagas or components to avoid duplicating that logic.
 */
export const exampleSelectors = {
  getCounter: (state) => state.example.get('counter'),
}
