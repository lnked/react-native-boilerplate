import { useCallback } from 'react'
import { useMappedState } from 'app/hooks/useMappedState'

export function useSelector(selector, ...args) {
  const mapStateToCounter = useCallback((state) => selector(state, ...args), args)
  return useMappedState(mapStateToCounter)
}
