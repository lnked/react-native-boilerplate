import { useCallback } from 'react'
import { useDispatch } from 'redux-react-hook'

export function useMappedAction(actionCreator) {
  const dispatch = useDispatch()
  return useCallback((...args) => dispatch(actionCreator(...args)), [])
}
